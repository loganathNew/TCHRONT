import React from 'react';
import Content from '../../components/layouts/Content';
import { connect } from "react-redux";
import DataTable from '../../components/forms/cutomDatatable';
import balanceService from '../../services/balance.service';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewIcon from '@mui/icons-material/Visibility';
import { Navigate } from 'react-router-dom';
import Dialog from '../../components/layouts/Dialog';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import { darken, lighten } from '@mui/material/styles';
import homeService from '../../services/home.service';
import Preloader from '../../components/layouts/Preloader';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleViewClick = this.handleViewClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
        this.filterLocationChange = this.filterLocationChange.bind(this);
        this.filterItemChange = this.filterItemChange.bind(this);
        this.filterClick = this.filterClick.bind(this);

        this.state = {
            status: props.status,
            redirect: false,
            redirectView: false,
            redirectList: this.props.redirectList,
            redirectId: "",
            dialogOpen: false,
            deleteId: null,
            disabled: false,
            loader: false,
            filter_location_id: "",
            filter_item_id: "", rows: [],
            locations: [], items: []
        };
    }

    submitDisable(val) {
        this.setState({ loader: val, disabled: val })
    }

    setStatusMsg(type, msg) {
        this.setState({ status: { show: true, type: type, msg: msg } });
        setInterval(() => {
            this.emptyStatusMsg();
            if (type == "success") { this.setState({ submitted: true }) }
        }, 4000);
    }

    emptyStatusMsg() {
        this.setState({ status: { show: false, type: 'success', msg: '' } });
    }

    componentDidMount() {
        this.getSelectDatas();
    }

    //Parameter Funciton
    getSelectDatas() {
        (async () => {
            const response = await homeService.getSelectDatas(1);
            let locations = await response.data.location;
            let items = await response.data.item;
            this.setState({ items: items, locations: locations })
            this.getListDatas()
        })();
    }

    handleEditClick = (val) => {
        this.redirectHandler(val.currentTarget.value);
    }

    redirectHandler = (id) => {
        this.setState({ redirect: true, redirectId: id })
        this.renderRedirect();
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            let path = '/balances/' + this.state.redirectId;
            return <Navigate to={path} />
        }
    }

    handleViewClick = (val) => {
        this.redirectViewHandler(val.currentTarget.value);
    }

    redirectViewHandler = (id) => {
        this.setState({ redirectView: true, redirectId: id })
        this.renderViewRedirect();
    }

    renderViewRedirect = () => {
        if (this.state.redirectView) {
            let path = '/balances/' + this.state.redirectId + '/view';
            return <Navigate to={path} />
        }
    }


    filterLocationChange(value) {
        this.setState({ filter_location_id: value.id })
    };
    filterItemChange(value) {
        this.setState({ filter_item_id: value.id })
    };

    filterClick = () => {
        this.setState({ redirectList: true })
        this.getListDatas()
    }

    handleDeleteClick = (val) => {
        this.setState({ dialogOpen: true, deleteId: val.currentTarget.value })
        this.renderDialog();
    }

    renderDialog = () => {
        if (this.state.dialogOpen) {
            return <Dialog open={this.state.dialogOpen} msg="Do you want delete the record?" handleCloseDialog={(newValue) => { this.handleCloseDialog(newValue) }} />
        }
    }

    handleCloseDialog(val) {
        if (val) {
            if (this.state.deleteId) {
                this.submitDisable(true)
                this.deleteRecord(this.state.deleteId)
            }
        }
        this.setState({ dialogOpen: false })
    }

    deleteRecord(deleteId) {
        balanceService.delete(deleteId)
            .then(response => {
                let updateData = response.data.data;
                if (updateData == 0) {
                    this.setStatusMsg("danger", response.data.msg)
                    return;
                }
                this.setStatusMsg("success", response.data.msg)
                this.setState({ deleteId: null })
                this.getListDatas();
                this.submitDisable(false)
            })
            .catch(e => {
                console.log(e);
                this.setState({ deleteId: null })
                this.setStatusMsg("danger", "Something went wrong")
                this.submitDisable(false)
            });
    }

    onStatusClose() {
        this.setState({ status: { show: false, type: 'success', msg: '' } });
    }


    getListDatas() {
        this.submitDisable(true);
        let params = this.state.filter_location_id + "&" + this.state.filter_item_id + "&";
        balanceService.getAll(params)
            .then(response => {
                let data = response.data;
                if (data.errors) {
                    this.setState({ rows: [] })
                    this.submitDisable(false);
                } else {
                    let allData = data.data.balances;
                    console.log(allData);
                    let rowArray = [];
                    allData.forEach((element, i) => {
                        let balanceElement = element;

                        balanceElement.sno = balanceElement.id;
                        balanceElement.id = i + 1;

                        let location = this.state.locations.filter(obj => { return obj.id == balanceElement.location_id });
                        balanceElement.location_id = (location.length > 0) ? location[0].name : "";

                        let item = this.state.items.filter(obj => { return obj.id == balanceElement.item_id });
                        balanceElement.item_id = (item.length > 0) ? item[0].name : "";


                        //console.log(productsElement);
                        rowArray.push({ ...balanceElement })
                    });
                    this.setState({ rows: rowArray })
                    this.submitDisable(false)
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({ rows: [] })
                this.submitDisable(false)
            });
    }

    render() {

        const { disabled, loader } = this.state;

        const columns = [
            {
                field: 'id', headerName: 'ID',
                headerAlign: 'left', width: 20
            },
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                // width: 30,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                    return (
                        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                            <IconButton aria-label="add an alarm"
                                value={params.row.sno}
                                onClick={e => this.handleEditClick(e)} disabled={disabled}>
                                <EditIcon style={{ color: "blue" }} />
                            </IconButton>
                            <IconButton aria-label="add an alarm"
                                value={params.row.sno}
                                onClick={e => this.handleViewClick(e)} disabled={disabled}>
                                <ViewIcon style={{ color: "blue" }} />
                            </IconButton>
                        </div>
                    );
                }
            },
            { field: 'location_id', headerName: 'Location' },
            { field: 'item_id', headerName: 'Item' },
            { field: 'total_inward', headerName: 'Total Inward' },
            { field: 'total_outward', headerName: 'Total Outward' },
            { field: 'balance', headerName: 'Balance' },
            { field: 'total_inbag', headerName: 'Total Inbag' },
            { field: 'total_outbag', headerName: 'Total Outbag' },
            { field: 'balance_bag', headerName: 'Balance Bag' },
           
            {
                field: "delete",
                headerName: "Delete",
                sortable: false,
                width: 30,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                    return (
                        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                            <IconButton aria-label="add an alarm"
                                value={params.row.sno}
                                onClick={e => this.handleDeleteClick(e)} disabled={disabled}>
                                {loader ? <ButtonLoader /> : <DeleteIcon style={{ color: "Black" }} />}
                            </IconButton>

                        </div>
                    );
                }
            }

        ];
        const dialogOpen = this.state.dialogOpen;

        const getBackgroundColor = (color, mode) =>
            mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

        const getHoverBackgroundColor = (color, mode) =>
            mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);




        return (


            <React.Fragment>
                {this.state.loader ? <Preloader /> : ""}

                <Content menu="Balances" action="List" status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    filterClick={this.filterClick}
                    filterLocationChange={(newValue) => { this.filterLocationChange(newValue) }}
                    filterItemChange={(newValue) => { this.filterItemChange(newValue) }}
                    list={
                        <DataTable columns={columns} rows={this.state.rows} />
                    }
                />
                <div>
                    {this.renderRedirect()}
                    {this.renderViewRedirect()}
                </div>
                {this.renderDialog()}

            </React.Fragment >

        )
    }
}


const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(List);

