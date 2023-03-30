import React from 'react';
import Content from '../../components/layouts/Content';
import InterDataService from '../../services/inter.service';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import Preloader from '../../components/layouts/Preloader';

import "react-inputs-validation/lib/react-inputs-validation.min.css";
import CustomDatePicker from '../../components/forms/customDatepicker';
import { TextBoxComponent, SelectBoxComponent, InterComponent } from '../../components/forms/formboxComponent';
import homeService from '../../services/home.service';

class Inters extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveInters = this.saveInters.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //Parameters changes
        this.handleDate = this.handleDate.bind(this);
        this.handleDateText = this.handleDateText.bind(this);

        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);


        this.FieldItemcomponent = React.createRef();
        this.state = {
            submitted: false, disabled: false, loader: false, status: props.status, validate: false,
            //Arrays
            products: [{
                id: "", item_id: "", item_name: "", item_value: "", supplier_id: "", dcno: "", bags: "", avg_weight: "",
                hasItemIdError: true, hasItemValueError: true, hasSupplierIdError: true, hasDCNOError: true, hasBagsError: true, hasAVGWeightError: true, validate: false
            }],
            //Parameter
            id: null,
            date: new Date(),
            from_id: "", to_id: "", inv_no: "",
            vehicle_no: "", remarks: "",

            //Date Errors
            showDateErrorMsg: false,
            hasDateError: true,
            //Input Errors
            hasFromError: true, hasToError: true, hasInvnoError: true, hasVehicleNoError: true,
            items: [], locations: [], suppliers: [], deletedIds: [],
        };
        //this.state = testData;
        // console.log(this.state);
    }

    //Date Funciton
    handleDate = (value) => {
        this.setState({ date: value });
    }

    handleDateText(value) {
        this.setState({ hasDateError: value, showDateErrorMsg: value })
        this.setState({ hasWeekError: false, validate: false })
    }
    //End Date Funciton


    //Common Function
    setStatusMsg(type, msg) {
        this.setState({ status: { show: true, type: type, msg: msg } });
        setInterval(() => {
            this.emptyStatusMsg();
            if (type == "success") { this.setState({ submitted: true }) }
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
            let suppliers = await response.data.supplier;
            let locations = await response.data.location;
            this.setState({ items: items, suppliers: suppliers, locations: locations })
        })();
    }

    handleChangeSelectValue(value, key) {
        this.setState({ [key]: value.id });
    }

    handleChangeInputValue(value, key) {
        value = (value == "" || value == "NULL" || value == undefined || value == "NaN") ? 0 : value;
        this.setState(() => ({
            [key]: value
        }), () => { });
    }

    handleChangeTextValue(value, key) {
        this.setState(() => ({
            [key]: value
        }), () => { });
    }


    dataInit(id) {
        InterDataService.get(id)
            .then(async (response) => {
                let updateData = response.data.data;
                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.submitDisable(true)
                    this.setStatusMsg("danger", "Something went wrong")
                    return;
                }

                let updatedData = { ...updateData };
                let new_products = this.formProducts(updatedData.products);

                updatedData.products = new_products;

                updatedData.hasFromError = false; updatedData.hasToError = false;
                updatedData.hasDateError = false; updatedData.hasInvnoError = false; updatedData.hasVehicleNoError = false;

                this.FieldItemcomponent.current = new_products;
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

    formProducts(products) {
        let new_products = [];
        if (products.length > 0) {
            products.forEach(product => {
                new_products.push({ ...product, hasItemIdError: false, hasItemValueError: false, hasSupplierIdError: false, hasDCNOError: false, hasBagsError: false, hasAVGWeightError: false, validate: false });
            });
        } else { new_products = this.state.products; }
        return new_products;
    }


    saveInters() {
        this.submitDisable(true)
        var data = this.state;
        var products = this.FieldItemcomponent.current;
        var deletedIds = this.FieldItemcomponent.current.deletedIds;
        data['products'] = products;
        data['deletedIds'] = deletedIds;
        // console.log(deletedIds);

        let callApi = (this.state.id != null) ?
            InterDataService.update(this.state.id, data) :
            InterDataService.create(data);

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
            this.saveInters();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    checkAllParam() {
        const { hasFromError, hasToError, hasInvnoError, hasVehicleNoError } = this.state;

        let itemArrays = this.FieldItemcomponent.current;
        let hasItemComponentError = true;
        if (itemArrays) {
            itemArrays.map((e, i) => {
                hasItemComponentError = (!e.hasItemIdError && !e.hasItemValueError && !e.hasDCNOError && !e.hasBagsError && !e.hasAVGWeightError) ? false : true;
                return hasItemComponentError;
            });
        }
        // console.log(hasFromError + " " + hasToError + " " + hasInvnoError + " " + hasVehicleNoError);
        // console.log(hasItemComponentError);

        return (
            !hasFromError && !hasToError && !hasInvnoError &&
            !hasVehicleNoError &&
            !hasItemComponentError
        ) ? true : false;
    }


    render() {
        const { from_id, to_id, date, inv_no, vehicle_no, remarks,
            hasDateError, showDateErrorMsg,
            disabled, loader, submitted, validate,
            items, suppliers, locations, deletedIds } = this.state;

        let readOnly = true;
        let required = true;
        let check = true;
        return (
            <React.Fragment>
                <div>
                    {(submitted) ? <Navigate to={'/Inters/list'} /> : ""}
                </div>
                <Content menu="Inters" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={submitted}
                    form={
                        <React.Fragment>
                            {loader ? <Preloader /> : ""}
                            <div className='row'>
                                <SelectBoxComponent
                                    element={{ id: 'from_id', label: "From Id", name: "from_id", value: from_id, validate, required, check }}
                                    optionList={locations}
                                    colClass="col-xl-2 col-lg-2"
                                    isBgSet={false}
                                    onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'from_id') }}
                                    validationCallback={res => this.setState({ hasFromError: res, validate: false })} />

                                <SelectBoxComponent
                                    element={{ id: 'to_id', label: "To Id", name: "to_id", value: to_id, validate, required, check }}
                                    optionList={locations}
                                    colClass="col-xl-2 col-lg-2"
                                    isBgSet={false}
                                    onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'to_id') }}
                                    validationCallback={res => this.setState({ hasToError: res, validate: false })} />

                                <div className="col-xl-2 col-lg-2">
                                    <div className="form-group">
                                        <h5 className="card-title fs-14">Date <span className="text-danger">*</span></h5>
                                        <CustomDatePicker
                                            onChangeDateTime={this.handleDate}
                                            onChangeText={this.handleDateText}
                                            dateTime={date}
                                            hasDateError={hasDateError}
                                            showDateErrorMsg={showDateErrorMsg}
                                        />
                                    </div>
                                </div>

                                <TextBoxComponent element={{ name: "inv_no", label: "Inv No", value: inv_no, validate, required, check }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'inv_no') }}
                                    colClass="col-xl-2 col-lg-2" isBgSet={false}
                                    validationCallback={res => this.setState({ hasInvnoError: res, validate: false })} />

                                <TextBoxComponent element={{ name: "vehicle_no", label: "Vehicle No", value: vehicle_no, validate, required, check }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'vehicle_no') }}
                                    colClass="col-sm" isBgSet={false}
                                    validationCallback={res => this.setState({ hasVehicleNoError: res, validate: false })} />

                                <TextBoxComponent element={{ name: "remarks", value: remarks }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'remarks') }}
                                    colClass="col-sm" isBgSet={false}
                                />
                            </div>

                            <InterComponent ref={this.FieldItemcomponent} products={this.state.products} deletedIds={deletedIds} items={items} suppliers={suppliers} />



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

export default connect(mapStateToProps)(Inters);
