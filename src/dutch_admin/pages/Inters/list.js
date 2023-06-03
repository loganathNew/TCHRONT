import React from 'react';
import Content from '../../components/layouts/Content';
import { connect } from "react-redux";
import DataTable from '../../components/forms/cutomDatatable';
import IntersDataService from '../../services/inter.service';
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
        this.filterFromChange = this.filterFromChange.bind(this);
        this.filterToChange = this.filterToChange.bind(this);
        this.filterItemChange = this.filterItemChange.bind(this);
        this.filterStartDateChange = this.filterStartDateChange.bind(this);
        this.filterEndDateChange = this.filterEndDateChange.bind(this);
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
            filter_from_id: "",
            filter_to_id: "",
            filter_item_id: "",
            filter_start_date: "",
            filter_end_date: "",
            totalInwardNet: 0.00,
            rows: [],
            locations: [], storage_locations: [], qcNames: [], suppliers: []
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
            let suppliers = await response.data.supplier;
            let locations = await response.data.location;
            let storage_locations = await response.data.storage_location;
            let qcNames = await response.data.qc_name;
            this.setState({ suppliers: suppliers, locations: locations })
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
            let path = '/inters/' + this.state.redirectId;
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
            let path = '/inters/' + this.state.redirectId + '/view';
            return <Navigate to={path} />
        }
    }


    filterLocationChange(value) {
        this.setState({ filter_location_id: value.id })
    };

    filterFromChange(value) {
        this.setState({ filter_from_id: value.id });
    }

    filterToChange(value) {
        this.setState({ filter_to_id: value.id });
    }

    filterItemChange(value) {
        this.setState({ filter_item_id: value.id })
    };

    filterClick = () => {
        this.setState({ redirectList: true })
        this.getListDatas()
    }

    filterStartDateChange = (value) => {
        this.setState({ filter_start_date: value })
    }

    filterEndDateChange = (value) => {
        this.setState({ filter_end_date: value })
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
        IntersDataService.delete(deleteId)
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

        let params = this.state.filter_from_id + "&" + this.state.filter_to_id + "&" + this.state.filter_item_id + "&" + this.state.filter_start_date + "&" + this.state.filter_end_date + "&";
        IntersDataService.getAll(params)
            .then(response => {
                let data = response.data;
                if (data.errors) {
                    this.setState({ rows: [] })
                    this.submitDisable(false)
                } else {
                    let allData = data.data.products;
                    let totalInwardNet = data.data.totalInwardNet;
                    let rowArray = [];
                    allData.forEach((element, i) => {
                        let interElement = { ...element.inter };
                        let productsElement = element;

                        interElement.sno = interElement.id;
                        interElement.id = i + 1;

                        let location = this.state.locations.filter(obj => { return obj.id == interElement.from_id });
                        interElement.from_id = (location.length > 0) ? location[0].name : "";
                        let location1 = this.state.locations.filter(obj => { return obj.id == interElement.to_id });
                        interElement.to_id = (location1.length > 0) ? location1[0].name : "";
                        let supplier = this.state.suppliers.filter(obj => { return obj.id == productsElement.supplier_id });
                        productsElement.supplier_id = (supplier.length > 0) ? supplier[0].name : "";

                        //console.log(productsElement);
                        rowArray.push({ ...productsElement, ...interElement })
                    });
                    this.setState({ rows: rowArray, totalInwardNet: totalInwardNet })
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
            { field: 'from_id', headerName: 'From Location' },
            { field: 'to_id', headerName: 'To Location' },
            { field: 'date', headerName: 'Date' },
            { field: 'inv_no', headerName: 'Inv No' },
            {
                field: 'item_name', headerName: 'Item', headerClassName: 'item_name', cellClassName: 'item_name',
                renderCell: (params) => {
                    return (
                        params.item_name
                    )
                }
            },
            { field: 'item_value', headerName: 'Item Value' },
            { field: 'bags', headerName: 'Bags' },
            { field: 'vehicle_no', headerName: 'Vechicle No' },
            { field: 'remarks', headerName: 'Remarks' },
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

        return (
            <React.Fragment>
                {this.state.loader ? <Preloader /> : ""}
                <Content menu="Inters" action="List" status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    totalInwardNet={this.state.totalInwardNet}
                    filterClick={this.filterClick}
                    filterFromChange={(newValue) => { this.filterFromChange(newValue) }}
                    filterToChange={(newValue) => { this.filterToChange(newValue) }}
                    filterLocationChange={(newValue) => { this.filterLocationChange(newValue) }}
                    filterItemChange={(newValue) => { this.filterItemChange(newValue) }}
                    filterStartDateChange={(newValue) => { this.filterStartDateChange(newValue) }}
                    filterEndDateChange={(newValue) => { this.filterEndDateChange(newValue) }}
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

