import React from 'react';
import Content from '../../components/layouts/Content';
import { connect } from "react-redux";
import DataTable from '../../components/forms/cutomDatatable';
import MastersDataService from '../../services/master.service';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { Navigate } from 'react-router-dom';
import Dialog from '../../components/layouts/Dialog';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import Preloader from '../../components/layouts/Preloader';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleActiveClick = this.handleActiveClick.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);

        this.state = {
            master: props.master,
            status: props.status,
            redirect: false,
            redirectId: "",
            dialogOpen: false,
            deleteId: null,
            disabled: false,
            loader: false,
            msg: "",
            rows: []
        };
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        let menu = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : nextProps.master;
        // console.log(menu);
        this.setState(() => ({
            master: menu
        }), () => {
            this.getListDatas()
        });
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
        this.getListDatas();
    }

    handleEditClick = (val) => {
        this.redirectHandler(val.currentTarget.value);
    }

    redirectHandler = (id) => {
        this.setState({ redirect: true, redirectId: id })
        this.renderRedirect(id);
    }

    renderRedirect = (id) => {
        if (this.state.redirect) {
            let path = '/' + this.state.master + '/' + this.state.redirectId;
            return <Navigate to={path} />
        }
    }


    handleDeleteClick = (val) => {
        this.setState({ dialogOpen: true, deleteId: val.currentTarget.value, msg: "Do you want delete this record?" })
    }

    handleActiveClick = (val) => {
        this.setState({ dialogOpen: true, deleteId: val.currentTarget.value, msg: "Do you want active this record?" })
    }

    renderDialog = () => {
        if (this.state.dialogOpen) {
            return <Dialog open={this.state.dialogOpen} msg={this.state.msg} handleCloseDialog={(newValue) => { this.handleCloseDialog(newValue) }} />
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
        MastersDataService.delete(deleteId, this.state.master)
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
        this.submitDisable(true)
        MastersDataService.getAll(this.state.master)
            .then(response => {
                let data = response.data;
                if (data.errors) {
                    this.setState({ rows: [] })
                } else {
                    this.setState({ rows: response.data.data })
                }
                this.submitDisable(false)
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
            { field: 'id', headerName: 'ID', minWidth: 150 },
            { field: 'name', headerName: 'Name', minWidth: 200 },
            { field: 'des', headerName: 'Description', minWidth: 300 },
            { field: 'value', headerName: 'Value', minWidth: 150 },
            {
                field: 'status', headerName: 'Status', minWidth: 150,
                renderCell: (params) => {
                    return (
                        <span className={params.row.status}>
                            {params.row.status}
                        </span>
                    )
                }
            },
            {
                field: "actions",
                headerName: "Actions",
                sortable: false,
                minWidth: 200,
                disableClickEventBubbling: true,
                renderCell: (params) => {
                    return (
                        <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                            <IconButton aria-label="add an alarm"
                                value={params.row.id}
                                onClick={e => this.handleEditClick(e)} disabled={disabled}>
                                <EditIcon style={{ color: "blue" }} />
                            </IconButton>

                            {params.row.status == "Active" ?
                                <IconButton aria-label="add an alarm"
                                    value={params.row.id}
                                    onClick={e => this.handleDeleteClick(e)} disabled={disabled}>
                                    {loader ? <ButtonLoader /> : <DeleteIcon style={{ color: "Black" }} />}
                                </IconButton>
                                :

                                <IconButton aria-label="add an alarm green"
                                    value={params.row.id}
                                    onClick={e => this.handleActiveClick(e)} disabled={disabled}>
                                    {loader ? <ButtonLoader /> : <CheckIcon style={{ color: "Black" }} />}
                                </IconButton>
                            }

                        </div>
                    );
                }
            }

        ];
        const dialogOpen = this.state.dialogOpen;
        return (
            <React.Fragment>
                {this.state.loader ? <Preloader /> : ""}
                <Content menu="Masters" action="List" status={this.state.status}
                    master={this.state.master}
                    onStatusClose={this.onStatusClose}
                    list={
                        <DataTable columns={columns} rows={this.state.rows} />
                    }
                />
                <div>
                    {this.renderRedirect()}
                </div>
                {this.renderDialog()}

            </React.Fragment>

        )
    }
}


const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(List);

