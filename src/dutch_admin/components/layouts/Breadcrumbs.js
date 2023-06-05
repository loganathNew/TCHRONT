import React from 'react';
import { Link } from 'react-router-dom';
import { SelectBoxComponent } from '../forms/formboxComponent';
import CustomDatePicker from '../forms/customDatepicker';
import homeService from '../../services/home.service';
import authService from '../../services/auth.service';
import authAction from '../../store/actions/auth';
import { connect } from 'react-redux';

class Breadcrumbs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menu: (props.master) ? props.master : props.menu,
            action: props.action,
            totalInwardNet: props.totalInwardNet,
            totalOutwardNet: props.totalOutwardNet,

            isDashboard: (props.menu == "Dashboard") ? true : false,
            isInwardList: (props.menu == "Inwards" && props.action == "List") ? true : false,
            isInterList: (props.menu == "Inters" && props.action == "List") ? true : false,
            isOutwardList: (props.menu == "Outwards" && props.action == "List") ? true : false,
            isBalanceList: (props.menu == "Balances" && props.action == "List") ? true : false,

            redirectTo: this.formingRedirectTo(props.master, props.menu, props.action),
            redirectLabel: this.formingRedirectLabel(props.master, props.menu, props.action),

            location_id: "",
            supplier_id: "",
            ec: "",
            from_id: "",
            to_id: "",
            item_id: "",
            start_date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            end_date: new Date(),
            items: [], locations: [],
            suppliers: [], ecs: [],
            checkedUser: null,
        };
        this.filterLocationChange = this.filterLocationChange.bind(this);
        this.filterFromChange = this.filterFromChange.bind(this);
        this.filterToChange = this.filterToChange.bind(this);
        this.filterItemChange = this.filterItemChange.bind(this);
        this.filterSupplierChange = this.filterSupplierChange.bind(this);
        this.filterECChange = this.filterECChange.bind(this);
        this.filterStartDateChange = this.filterStartDateChange.bind(this);
        this.filterEndDateChange = this.filterEndDateChange.bind(this);
        this.filterClick = this.filterClick.bind(this);
    }


    formingRedirectTo(master, menu, action) {
        return (master) ?
            action == "List" ? "/" + master.toLowerCase() : "/" + master.toLowerCase() + "/list" :
            action == "List" ? "/" + menu.toLowerCase() : "/" + menu.toLowerCase() + "/list";
    }

    formingRedirectLabel(master, menu, action) {
        let menuLabel = (master) ?
            action == "List" ? "Add" : master + " List" :
            action == "List" ? "Add" : menu + " List";
        return menuLabel.replace("_", " ");
    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.state.isInwardList || this.state.isInterList) {
            this.setState({ totalInwardNet: nextProps.totalInwardNet.toFixed(2) });
        }
        if (this.state.isOutwardList) {
            this.setState({ totalOutwardNet: nextProps.totalOutwardNet.toFixed(2) });
        }
        if (this.props.master) {
            let menu = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : nextProps.master;
            let redirectTo = this.formingRedirectTo(menu, menu, this.state.action);
            let redirectLabel = this.formingRedirectLabel(menu, menu, this.state.action);
            this.setState({ menu: menu, redirectTo: redirectTo, redirectLabel: redirectLabel });
        }

        if (this.state.checkedUser == null) {
            this.getToken();
        }
    }

    getToken() {
        (async () => {
            let user_id = window.localStorage.getItem("user_id");
            const response = await authService.checking_authenticate({ user_id: user_id });
            var checkedUser = response.data.user;
            this.setState({ checkedUser: checkedUser });
            if (checkedUser == null) {
                this.loginFailedFun();
                window.location.reload();
            }
        })();
    };

    loginFailedFun() {
        let userInfo = { token: '', user_name: '', user_role: '', user_id: '', permissions: [] };
        let dispatchUser = { ...userInfo };
        this.props.authAction(dispatchUser)
        window.localStorage.setItem("token", userInfo.token);
        window.localStorage.setItem("user_name", userInfo.user_name);
        window.localStorage.setItem("user_role", userInfo.user_role);
        window.localStorage.setItem("user_id", userInfo.user_id);
        window.localStorage.setItem("permissions", JSON.stringify(userInfo.permissions));
    }

    componentDidMount() {
        this.getSelectDatas();
    }

    getSelectDatas() {
        (async () => {
            const response = await homeService.getSelectDatas(null);
            let items = await response.data.item;
            let locations = await response.data.location;
            let suppliers = await response.data.supplier;
            let ecs = await response.data.ecs;
            this.setState({ items: items, locations: locations, suppliers: suppliers, ecs: ecs })
        })();
    }


    filterLocationChange(value) {
        this.setState({ location_id: value.id });
        this.props.filterLocationChange(value);
    }

    filterFromChange(value) {
        this.setState({ from_id: value.id });
        this.props.filterFromChange(value);
    }

    filterToChange(value) {
        this.setState({ to_id: value.id });
        this.props.filterToChange(value);
    }

    filterItemChange(value) {
        this.setState({ item_id: value.id });
        this.props.filterItemChange(value);
    }

    filterSupplierChange(value) {
        this.setState({ supplier_id: value.id });
        this.props.filterSupplierChange(value);
    }

    filterECChange(value) {
        this.setState({ ec: value.id });
        this.props.filterECChange(value);
    }

    filterStartDateChange = (value) => {
        let YearMonthDate = this.getYearMonthDate(value.$d);
        //console.log(YearMonthDate);
        this.setState({ start_date: value });
        this.props.filterStartDateChange(YearMonthDate);
    }

    filterEndDateChange = (value) => {
        this.setState({ end_date: value });
        let YearMonthDate = this.getYearMonthDate(value.$d);
        //console.log(YearMonthDate);
        this.props.filterEndDateChange(YearMonthDate);
    }


    getYearMonthDate = function (dateIns) {
        let DateString = dateIns.getFullYear() + '-'
            + ('0' + (dateIns.getMonth() + 1)).slice(-2) + '-'
            + ('0' + dateIns.getDate()).slice(-2);
        return DateString;
    };

    filterClick = () => {
        this.props.filterClick();
    }

    render() {
        const { isDashboard, isInterList, isInwardList, isOutwardList, isBalanceList, location_id, supplier_id, ec,
            from_id, to_id, item_id, start_date, end_date, action,
            items, locations, suppliers, ecs } = this.state;
        return (
            <React.Fragment>
                {/* <div>
                    {(this.state.loginFailed) ? <Navigate to={'/login'} /> : ""}
                </div> */}
                <div className="row">
                    {isDashboard ? (
                        <div className="col-sm ml-3">
                            <div className="mr-auto d-none d-lg-block">
                                <h2 className="text-black font-w600 mb-0">Dashboard</h2>
                                <p className="mb-0">Welcome to Dutch Plantin Admin!</p>

                            </div>
                        </div>) :
                        isInwardList || isInterList || isOutwardList || isBalanceList ? (
                            <div className="col-sm justify-content-sm-start mt-0 mb-0 d-flex">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item card-title fs-14">{this.state.menu.replace("_", " ")} - {this.state.action}</li>
                                </ol>
                            </div>
                        ) :
                            <div className="col-sm-4 justify-content-sm-start mt-0 mb-0 d-flex">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item card-title fs-16">{this.state.menu.replace("_", " ")} - {this.state.action}</li>
                                </ol>
                            </div>
                    }
                    {isInwardList || isInterList || isDashboard || isOutwardList || isBalanceList ? (
                        <React.Fragment>
                            <div className={isDashboard ? "col-sm-9" : "col-sm-9"}>
                                {/* <div className="col-sm-10"> */}
                                <div className={isDashboard ? 'row' : 'row border border-success'} >
                                    {isInwardList || isDashboard || isOutwardList || isBalanceList ? (

                                        <SelectBoxComponent
                                            element={{ id: 'location_id', name: "location", value: location_id }}
                                            optionList={locations}
                                            colClass={isDashboard ? "col-sm-3" : "col-sm-2"}
                                            isBgSet={false}
                                            onChange={(newValue) => { this.filterLocationChange(newValue) }} />
                                    ) :
                                        ""}

                                    {isInterList ? (
                                        <React.Fragment>

                                            <SelectBoxComponent
                                                element={{ id: 'from_id', name: "from_id", value: from_id }}
                                                optionList={locations}
                                                colClass="col-sm-2"
                                                isBgSet={false}
                                                onChange={(newValue) => { this.filterFromChange(newValue) }} />

                                            <SelectBoxComponent
                                                element={{ id: 'to_id', name: "to_id", value: to_id }}
                                                optionList={locations}
                                                colClass="col-sm-2"
                                                isBgSet={false}
                                                onChange={(newValue) => { this.filterToChange(newValue) }} />
                                        </React.Fragment>
                                    ) :
                                        ""}

                                    {isInwardList || isInterList || isOutwardList || isBalanceList ? (
                                        <SelectBoxComponent
                                            element={{ id: 'item_id', name: "item", value: item_id }}
                                            optionList={items}
                                            colClass="col-sm-2"
                                            isBgSet={false}
                                            onChange={(newValue) => { this.filterItemChange(newValue) }}
                                        />
                                    ) : ""}


                                    {isInwardList ? (
                                        <>
                                            <SelectBoxComponent
                                                element={{ id: 'supplier_id', name: "Supplier", value: supplier_id }}
                                                optionList={suppliers}
                                                colClass={isDashboard ? "col-sm-3" : "col-sm-2"}
                                                isBgSet={false}
                                                onChange={(newValue) => { this.filterSupplierChange(newValue) }} />

                                            <SelectBoxComponent
                                                element={{ id: 'ec', name: "EC", value: ec }}
                                                optionList={ecs}
                                                colClass={isDashboard ? "col-sm-3" : "col-sm-2"}
                                                isBgSet={false}
                                                onChange={(newValue) => { this.filterECChange(newValue) }} />
                                        </>
                                    ) :
                                        ""}

                                    {!isDashboard && !isBalanceList ? (
                                        <React.Fragment>

                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <h5 className="card-title fs-14">Start Date <span className="text-danger">*</span></h5>
                                                    <CustomDatePicker
                                                        onChangeDateTime={this.filterStartDateChange}
                                                        dateTime={start_date}
                                                        onChangeText={() => { }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="form-group">
                                                    <h5 className="card-title fs-14">End Date <span className="text-danger">*</span></h5>
                                                    <CustomDatePicker
                                                        onChangeDateTime={this.filterEndDateChange}
                                                        dateTime={end_date}
                                                        onChangeText={() => { }}
                                                    />
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    ) : ""}


                                    < div className={isDashboard ? "col-sm-2 justify-content-sm-end d-flex" : "col-sm-1 justify-content-sm-end d-flex"}
                                        style={(isInwardList || isInterList) ? { marginLeft: '20px' } : {}}
                                    >
                                        {!isDashboard ? (

                                            <div className="btn-head">
                                                <button type="button" onClick={this.filterClick} className="btn btn-primary btn-rounded btn-xs align-items-center">
                                                    Filter
                                                </button>
                                            </div>
                                        ) : ""}

                                    </div>
                                    {(isDashboard || isBalanceList) ?
                                        // <div className="col-sm-3">
                                        //     <div className="form-group">
                                        //         <h5 className="card-title fs-16">Total Inward Net Weight</h5>
                                        //         <div className="border border-success p-2 green">
                                        //             {this.state.totalInwardNet}
                                        //         </div>
                                        //         <h5 className="card-title fs-16">Total Outward Net Weight</h5>
                                        //         <div className="border border-success p-2 green">
                                        //             {this.state.totalOutwardNet}
                                        //         </div>
                                        //     </div>
                                        // </div>
                                        ""
                                        :
                                        <div className={(isInwardList || isInterList) ? "col-sm justify-content-sm-end d-flex" : "col-sm-3"}>
                                            <div className="form-group">
                                                <h5 className="card-title fs-16">Total Net Weight</h5>
                                                <div className="border border-success p-2 green">
                                                    {(isInwardList || isInterList) ? this.state.totalInwardNet : this.state.totalOutwardNet}
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    {isDashboard ?

                                        <>
                                            <p><span className="dot" style={{ backgroundColor: "green" }}></span> Total Balance&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span className="dot" style={{ backgroundColor: "red" }}></span> Total Bags</p>
                                        </>

                                        : ""
                                    }

                                </div>
                            </div>
                        </React.Fragment>
                    ) : ""
                    }
                    {
                        !isDashboard ?

                            <div className={action == "List" ? "col-sm justify-content-sm-end d-flex" : "col-sm justify-content-sm-end d-flex"}>
                                <div className="btn-head">
                                    <Link to={this.state.redirectTo}>
                                        <button type="button" className="btn btn-warning btn-rounded btn-xs align-items-center">
                                            <span className="fs-16">{this.state.redirectLabel.replace("_", " ")}</span>
                                            {this.state.redirectLabel == "Add" ? <i className="fa fa-plus scale5 ml-3"></i> : ""}
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            : ""
                    }

                </div >
            </React.Fragment>);
    }
}

const mapDispatchToProps = dispatch => ({
    authAction: (payload) => dispatch(authAction(payload))
});

export default connect(null, mapDispatchToProps)(Breadcrumbs);