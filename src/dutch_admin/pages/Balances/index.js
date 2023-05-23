import React from 'react';
import Content from '../../components/layouts/Content';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import Preloader from '../../components/layouts/Preloader';

import "react-inputs-validation/lib/react-inputs-validation.min.css";
import { NumberBoxComponent, TextBoxComponent, SelectBoxComponent, ItemComponent } from '../../components/forms/formboxComponent';
import balanceService from '../../services/balance.service';
import homeService from '../../services/home.service';

class Balances extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveBalance = this.saveBalance.bind(this);
        this.validateForm = this.validateForm.bind(this);

        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);


        this.FieldItemcomponent = React.createRef();
        this.state = {
            submitted: false, disabled: false, loader: false, status: props.status, validate: false,
            //Parameter
            id: null,
            location_id: "",
            item_id: "",
            total_inward: 0,
            total_outward: 0,
            balance: 0,
            total_inbag: 0,
            total_outbag: 0,
            balance_bag: 0,

            //Input Errors
            hasLocationError: true, hasItemError: true,
            items: [], locations: []
        };
    }

    //Common Function
    setStatusMsg(type, msg) {
        this.setState({ status: { show: true, type: type, msg: msg } });
        setInterval(() => {
            this.emptyStatusMsg();
            if (type == "success") {
                // window.location.reload();
                this.setState({ submitted: true })
            }
        }, 4000);
    }

    submitDisable(val) {
        this.setState({ loader: val, disabled: val })
    }

    emptyStatusMsg() {
        this.setState({ status: { show: false, type: 'success', msg: '' } });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    componentDidMount() {
        let id = (window.location.pathname.split('/')[2]) ? window.location.pathname.split('/')[2] : null;
        this.getSelectDatas(id);
        if (id != null) {
            // this.submitDisable(true)
            this.dataInit(id)
            this.getSelectDatas();
        }
    }

    //Parameter Funciton
    getSelectDatas(id) {
        (async () => {
            const response = await homeService.getSelectDatas(id);
            let items = await response.data.item;
            let locations = await response.data.location;
            this.setState({ items: items, locations: locations })
        })();
    }

    handleChangeSelectValue(value, key) {
        this.setState({ [key]: value.id });
    }

    handleChangeInputValue(value, key) {
        value = (value == "" || value == "NULL" || value == undefined || value == "NaN") ? 0 : value;
        this.setState(() => ({
            [key]: value
        }), () => {

            if (key == "total_inward" || key == "total_outward") {
                this.setState({ balance: (parseFloat(this.state.total_inward) - parseFloat(this.state.total_outward)).toFixed(2) });
            }
            if (key == "total_inbag" || key == "total_outbag") {
                this.setState({ balance_bag: (parseFloat(this.state.total_inbag) - parseFloat(this.state.total_outbag)).toFixed(2) });
            }
        });
    }

    handleChangeTextValue(value, key) {
        this.setState(() => ({
            [key]: value
        }), () => { });
    }


    dataInit(id) {
        balanceService.get(id)
            .then(async (response) => {
                let updateData = response.data.data;
                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.submitDisable(true)
                    this.setStatusMsg("danger", "Something went wrong")
                    return;
                }

                let updatedData = { ...updateData };

                updatedData.hasLocationError = false;
                updatedData.hasItemError = false;

                this.setState({ ...updatedData, }, () => {
                    let view = (window.location.pathname.split('/')[3]) ? window.location.pathname.split('/')[3] : null;
                    if (view != null) { this.setState({ disabled: true }) } else {
                        this.submitDisable(false)
                    }
                })

            })
            .catch(e => {
                console.log(e);
                this.submitDisable(true)
                this.setStatusMsg("danger", "Something went wrong")
            });
    }

    saveBalance() {
        this.submitDisable(true)
        var data = this.state;

        let callApi = (this.state.id != null) ?
            balanceService.update(this.state.id, data) :
            balanceService.create(data);

        callApi.then(response => {
            let data = response.data;
            if (data.errors) {
                data.errors.forEach(element => {
                    this.setStatusMsg("danger", element.msg)
                    this.submitDisable(false)
                    return;
                });
            } else {
                this.setStatusMsg("success", response.data.msg)
            }
        })
            .catch(e => {
                this.setStatusMsg("danger", "Something went wrong")
                this.submitDisable(false)
            });

    }

    toggleValidating(validate) {
        this.setState({ validate });
    }

    validateForm(e) {
        e.preventDefault();

        this.toggleValidating(true);
        if (this.checkAllParam() == true) {
            this.saveBalance();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    checkAllParam() {
        const {
            hasLocationError, hasItemError } = this.state;

        return (
            !hasLocationError && !hasItemError
        ) ? true : false;
    }


    render() {
        const { location_id, item_id, total_inward, total_outward, balance, total_inbag, total_outbag, balance_bag,
            disabled, loader, submitted, validate,
            items, locations
        } = this.state;

        let readOnly = true;
        let required = true;
        let check = true;
        return (
            <React.Fragment>
                <div>
                    {(submitted) ? <Navigate to={'/Balances/list'} /> : ""}
                </div>
                <Content menu="Balances" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={submitted}
                    form={
                        <React.Fragment>
                            {loader ? <Preloader /> : ""}
                            <div className='row'>
                                <SelectBoxComponent
                                    element={{ id: 'location_id', label: "Location Name", name: "location_id", value: location_id, validate, required, check }}
                                    optionList={locations}
                                    colClass="col-xl-5 col-lg-5"
                                    isBgSet={false}
                                    onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'location_id') }}
                                    validationCallback={res => this.setState({ hasLocationError: res, validate: false })} />

                                <SelectBoxComponent
                                    element={{ id: 'item_id', label: "Item Name", name: "item_id", value: item_id, validate, required, check }}
                                    optionList={items}
                                    colClass="col-xl-5 col-lg-5"
                                    isBgSet={false}
                                    onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'item_id') }}
                                    validationCallback={res => this.setState({ hasItemError: res, validate: false })} />
                            {/* </div>
                            <br></br>
                            <div className='row'> */}
                                <NumberBoxComponent element={{ name: "total_inward", value: total_inward }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'total_inward') }}
                                    colClass="col-xl-4 col-lg-3" isBgSet={false}
                                    validationCallback={() => { }} />

                                <NumberBoxComponent element={{ name: "total_outward", value: total_outward }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'total_outward') }}
                                    colClass="col-xl-4 col-lg-3" isBgSet={false}
                                    validationCallback={() => { }} />

                                <NumberBoxComponent element={{ name: "balance", value: balance, readOnly }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'balance') }}
                                    colClass="col-xl-4 col-lg-3" isBgSet={false}
                                    validationCallback={() => { }} />
                            {/* </div>
                            <div className='row'> */}

                            
                                <NumberBoxComponent element={{ name: "total_inbag", value: total_inbag }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'total_inbag') }}
                                    colClass="col-xl-4 col-lg-3" isBgSet={false}
                                    validationCallback={() => { }} />

                                <NumberBoxComponent element={{ name: "total_outbag", value: total_outbag }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'total_outbag') }}
                                    colClass="col-xl-4 col-lg-3" isBgSet={false}
                                    validationCallback={() => { }} />

                                <NumberBoxComponent element={{ name: "balance_bag", value: balance_bag, readOnly }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'balance_bag') }}
                                    colClass="col-xl-4 col-lg-3" isBgSet={false}
                                    validationCallback={() => { }} />

                            </div>
                        </React.Fragment>
                    }

                    submit={
                        < button onClick={this.validateForm} type="submit" className="btn btn-primary" disabled={disabled} >
                            {loader ? <ButtonLoader /> : "Submit"
                            }
                        </button >
                    }
                />
            </React.Fragment >
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Balances);
