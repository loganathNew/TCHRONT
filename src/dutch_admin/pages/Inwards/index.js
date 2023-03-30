import React from 'react';
import Content from '../../components/layouts/Content';
import InwardsDataService from '../../services/inward.service';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import Preloader from '../../components/layouts/Preloader';

import "react-inputs-validation/lib/react-inputs-validation.min.css";
import CustomDatePicker from '../../components/forms/customDatepicker';
import CustomTimePicker from '../../components/forms/customTimepicker';
import { nwtSet, aecSet, amSet, otherSet } from './consts';
import { NumberBoxComponent, TextBoxComponent, SelectBoxComponent, ItemComponent } from '../../components/forms/formboxComponent';
import homeService from '../../services/home.service';

class Inwards extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveInwards = this.saveInwards.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //Parameters changes
        this.handleRDate = this.handleRDate.bind(this);
        this.handleRDateText = this.handleRDateText.bind(this);
        this.handleOutTime = this.handleOutTime.bind(this);
        this.handleOutTimeText = this.handleOutTimeText.bind(this);

        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);


        this.FieldItemcomponent = React.createRef();
        this.state = {
            submitted: false, disabled: false, loader: false, status: props.status, validate: false,
            //Arrays
            products: [{
                id: "", item_id: "", item_name: "", item_value: "", supplier_id: "", dcno: "", bags: "",
                hasItemIdError: true, hasItemValueError: true, hasSupplierIdError: true, hasDCNOError: true, hasBagsError: true, validate: false
            }],
            //Parameter
            id: null,
            r_date: new Date(), in_time: new Date(), out_time: new Date(), inv_date: new Date(),
            location_id: "",

            inv_no: "", week: 0, duration: 0,
            lwt: 0, ewt: 0, nwt: 0, //(lwt-ewt)
            ecu: 0, ecm: 0, ecl: 0, aec: 0, //(ecu+ecm+ecl)
            m1: 0, m2: 0, m3: 0, am: 0, //(m1+m2+m3)
            sand: 0, fibre: 0, a_bagwt: 0, freight: "",
            vehicle_no: "", transporter: "", storage_location: "",
            qc_name: "", remarks: "",

            //Date Errors
            showRDateErrorMsg: false, showInvDateErrorMsg: false, showOutTimeErrorMsg: false, showInTimeErrorMsg: false,
            hasRDateError: true, hasInvDateError: true, hasInTimeError: true, hasOutTimeError: true,
            //Input Errors
            hasLocationError: true, hasWeekError: true, hasInvnoError: true, hasDurationError: true,
            hasLWTError: true, hasEWTError: true, hasNWTError: true, hasABagwtError: true,
            hasQCNameError: true, hasStorageLocError: true, hasTransporterError: true, hasVehicleNoError: true,
            items: [], locations: [], storage_locations: [], qcNames: [], suppliers: [], deletedIds: []
        };
        //this.state = testData;
        // console.log(this.state);
    }

    //Date Funciton
    handleRDate = (value) => {
        this.setState({ r_date: value });
        let week = this.getWeek(value.$d);
        this.setState({ week: week });
    }

    handleRDateText(value) {
        this.setState({ hasRDateError: value, showRDateErrorMsg: value })
        this.setState({ hasWeekError: false, validate: false })
    }

    getWeek = function (today) {
        var onejan = new Date(today.getFullYear(), 0, 1);
        var dayOfYear = ((today - onejan + 86400000) / 86400000);
        return Math.ceil(dayOfYear / 7)
    };

    handleOutTime = (value) => {
        this.setState({ out_time: value });
        let startDate = this.state.in_time;
        let endDate = value.$d;
        var duration = this.getDuration(startDate, endDate)
        this.setState({ duration: duration });
    }

    handleOutTimeText(value) {
        this.setState({ hasOutTimeError: value, showOutTimeErrorMsg: value })
        this.setState({ hasDurationError: false, validate: false })
    }

    getDuration = function (startDate, endDate) {
        let diffTime = Math.abs(endDate.valueOf() - startDate.valueOf());
        let days = diffTime / (24 * 60 * 60 * 1000);
        let hours = (days % 1) * 24;
        let minutes = (hours % 1) * 60;
        [hours, minutes] = [Math.floor(hours), Math.round(minutes * 100) / 100]
        var duration = hours + "." + minutes;
        return duration;
    };

    formTime(value) {
        let s = value.split(":");
        let h = s[0];
        let m = s[1];
        return new Date("", "", "", h, m);
    }
    //End Date Funciton


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
        } else {
            this.setState({ week: this.getWeek(new Date()) });
        }
    }

    //Parameter Funciton
    getSelectDatas(id) {
        (async () => {
            const response = await homeService.getSelectDatas(id);
            let items = await response.data.item;
            let suppliers = await response.data.supplier;
            let locations = await response.data.location;
            let storage_locations = await response.data.storage_location;
            let qcNames = await response.data.qc_name;
            this.setState({ items: items, suppliers: suppliers, locations: locations, storage_locations: storage_locations, qcNames: qcNames })
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
            if (key == "lwt" || key == "ewt") {
                this.setState({ nwt: (parseFloat(this.state.lwt) - parseFloat(this.state.ewt)).toFixed(2) });
                this.setState({ hasNWTError: false, validate: false })
            }
            if (key == "ecu" || key == "ecm" || key == "ecl") {
                this.setState({ aec: ((parseFloat(this.state.ecu) + parseFloat(this.state.ecm) + parseFloat(this.state.ecl)) / 3).toFixed(2) });
            }
            if (key == "m1" || key == "m2" || key == "m3") {
                this.setState({ am: ((parseFloat(this.state.m1) + parseFloat(this.state.m2) + parseFloat(this.state.m3)) / 3).toFixed(2) });
            }
        });
    }

    handleChangeTextValue(value, key) {
        this.setState(() => ({
            [key]: value
        }), () => { });
    }


    dataInit(id) {
        InwardsDataService.get(id)
            .then(async (response) => {
                let updateData = response.data.data;
                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.submitDisable(true)
                    this.setStatusMsg("danger", "Something went wrong")
                    return;
                }

                let updatedData = { ...updateData };
                updatedData.in_time = this.formTime(updatedData.in_time);
                updatedData.out_time = this.formTime(updatedData.out_time);
                let new_products = this.formProducts(updatedData.products);

                updatedData.products = new_products;

                updatedData.hasRDateError = false; updatedData.hasInTimeError = false; updatedData.hasOutTimeError = false; updatedData.hasInvDateError = false;
                updatedData.hasLocationError = false; updatedData.hasWeekError = false; updatedData.hasInvnoError = false; updatedData.hasDurationError = false;
                updatedData.hasQCNameError = false; updatedData.hasStorageLocError = false; updatedData.hasTransporterError = false; updatedData.hasVehicleNoError = false;
                updatedData.hasLWTError = false; updatedData.hasEWTError = false; updatedData.hasNWTError = false;
                updatedData.hasABagwtError = false;


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
                new_products.push({ ...product, hasItemIdError: false, hasItemValueError: false, hasSupplierIdError: false, hasDCNOError: false, hasBagsError: false, validate: false });
            });
        } else { new_products = this.state.products; }
        return new_products;
    }


    saveInwards() {
        this.submitDisable(true)
        var data = this.state;
        var products = this.FieldItemcomponent.current;
        var deletedIds = (this.FieldItemcomponent.current.deletedIds != null) ? this.FieldItemcomponent.current.deletedIds : [];
        // console.log(products);
        // console.log(deletedIds);
        data['products'] = products;
        data['deletedIds'] = deletedIds;

        let callApi = (this.state.id != null) ?
            InwardsDataService.update(this.state.id, data) :
            InwardsDataService.create(data);

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
            this.saveInwards();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    checkAllParam() {
        const {
            hasLocationError, hasDurationError, hasWeekError, hasInvnoError,
            hasQCNameError, hasStorageLocError, hasTransporterError, hasVehicleNoError,
            hasLWTError, hasEWTError, hasNWTError, hasABagwtError } = this.state;

        let itemArrays = this.FieldItemcomponent.current;
        let hasItemComponentError = true;
        if (itemArrays) {
            itemArrays.map((e, i) => {
                hasItemComponentError = (!e.hasItemIdError && !e.hasItemValueError && !e.hasDCNOError && !e.hasBagsError && !e.hasSupplierIdError) ? false : true;
                return hasItemComponentError;
            });
        }
        // console.log(hasLocationError + " " + hasDurationError + " " + hasWeekError + " " + hasInvnoError);
        // console.log(hasQCNameError + " " + hasStorageLocError + " " + hasTransporterError + " " + hasVehicleNoError);
        // console.log(hasLWTError + " " + hasEWTError + " " + hasNWTError + " " + hasABagwtError);
        // console.log(hasItemComponentError);

        return (
            !hasLocationError && !hasDurationError && !hasInvnoError &&
            !hasQCNameError && !hasStorageLocError && !hasTransporterError && !hasVehicleNoError &&
            !hasLWTError && !hasEWTError && !hasNWTError && !hasABagwtError &&
            !hasItemComponentError
        ) ? true : false;
    }


    render() {
        const { location_id, r_date, in_time, out_time, week, inv_no, inv_date, duration,
            storage_location, qc_name, freight, vehicle_no, transporter, remarks,
            hasRDateError, hasInTimeError, hasOutTimeError, hasInvDateError,
            showRDateErrorMsg, showInTimeErrorMsg, showOutTimeErrorMsg, showInvDateErrorMsg,
            disabled, loader, submitted, validate,
            items, suppliers, locations, qcNames, storage_locations, deletedIds } = this.state;

        let readOnly = true;
        let required = true;
        let check = true;
        return (
            <React.Fragment>
                <div>
                    {(submitted) ? <Navigate to={'/Inwards/list'} /> : ""}
                </div>
                <Content menu="Inwards" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={submitted}
                    form={
                        <React.Fragment>
                            {loader ? <Preloader /> : ""}
                            <div className='row'>
                                <SelectBoxComponent
                                    element={{ id: 'location_id', label: "Location Id", name: "location_id", value: location_id, validate, required, check }}
                                    optionList={locations}
                                    colClass="col-xl-2 col-lg-2"
                                    isBgSet={false}
                                    onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'location_id') }}
                                    validationCallback={res => this.setState({ hasLocationError: res, validate: false })} />

                                <div className="col-xl-2 col-lg-2">
                                    <div className="form-group">
                                        <h5 className="card-title fs-14">R Date <span className="text-danger">*</span></h5>
                                        <CustomDatePicker
                                            onChangeDateTime={this.handleRDate}
                                            onChangeText={this.handleRDateText}
                                            dateTime={r_date}
                                            hasRDateError={hasRDateError}
                                            showRDateErrorMsg={showRDateErrorMsg}
                                        />
                                    </div>
                                </div>

                                <NumberBoxComponent element={{ name: "week", value: week, validate, required, check, readOnly }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'week') }}
                                    colClass="col-xl-1 col-lg-1" isBgSet={false}
                                    validationCallback={() => { }} />

                                <div className="col-xl-1 col-lg-1">
                                    <div className="form-group">
                                        <h5 className="card-title fs-14">In time <span className="text-danger">*</span></h5>
                                        <CustomTimePicker
                                            onChangeDateTime={value => this.setState({ in_time: value })}
                                            onChangeText={value => this.setState({ hasInTimeError: value, showInTimeErrorMsg: value })}
                                            dateTime={in_time}
                                            hasInTimeError={hasInTimeError}
                                            showInTimeErrorMsg={showInTimeErrorMsg}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-1 col-lg-1">
                                    <div className="form-group">
                                        <h5 className="card-title fs-14">Out time <span className="text-danger">*</span></h5>
                                        <CustomTimePicker
                                            onChangeDateTime={this.handleOutTime}
                                            onChangeText={this.handleOutTimeText}
                                            dateTime={out_time}
                                            hasOutTimeError={hasOutTimeError}
                                            showOutTimeErrorMsg={showOutTimeErrorMsg}
                                        />
                                    </div>
                                </div>

                                <NumberBoxComponent element={{ name: "duration", value: duration, validate, required, check, readOnly }}
                                    onChange={(newValue) => { this.handleChangeInputValue(newValue, 'duration') }}
                                    colClass="col-xl-1 col-lg-1" isBgSet={false}
                                    validationCallback={() => { }} />

                                <TextBoxComponent element={{ name: "inv_no", label: "Inv No", value: inv_no, validate, required, check }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'inv_no') }}
                                    colClass="col-xl-2 col-lg-2" isBgSet={false}
                                    validationCallback={res => this.setState({ hasInvnoError: res, validate: false })} />


                                <div className="col-xl-2 col-lg-2">
                                    <div className="form-group">
                                        <h5 className="card-title fs-14">Inv.Date<span className="text-danger">*</span></h5>
                                        <CustomDatePicker
                                            onChangeDateTime={value => this.setState({ inv_date: value })}
                                            onChangeText={value => this.setState({ hasInvDateError: value, showInvDateErrorMsg: value })}
                                            dateTime={inv_date}
                                            hasRDateError={hasInvDateError}
                                            showRDateErrorMsg={showInvDateErrorMsg}
                                        />
                                    </div>
                                </div>
                            </div>

                            <ItemComponent ref={this.FieldItemcomponent} products={this.state.products} items={items} suppliers={suppliers} deletedIds={deletedIds} />

                            <fieldset className="fieldSet">
                                <legend runat="server" visible="true" className="fieldsetLegend">Calculations:</legend>
                                <div className='row'>
                                    {nwtSet.map((element, i) => {
                                        readOnly = (element.name == "nwt") ? true : false;
                                        return (
                                            < NumberBoxComponent key={i} element={{
                                                name: element.name, des: element.des, value: this.state[`${element.name}`], validate,
                                                required, check, readOnly
                                            }}
                                                onChange={(newValue) => { this.handleChangeInputValue(newValue, element.name) }}
                                                isBgSet={true} colClass="col-sm" bgColor="#D8DAFC"
                                                validationCallback={res => this.setState({ [`${element.hasError}`]: res, validate: false })} />)

                                    })}

                                    {aecSet.map((element, i) => {
                                        readOnly = (element.name == "aec") ? true : false;
                                        return (
                                            < NumberBoxComponent key={i} element={{
                                                name: element.name, des: element.des, value: this.state[`${element.name}`], readOnly
                                            }}
                                                onChange={(newValue) => { this.handleChangeInputValue(newValue, element.name) }}
                                                isBgSet={true} colClass="col-sm" bgColor="#E8F7A0"
                                                validationCallback={() => { }} />)
                                    })}
                                </div>
                                <div className='row'>
                                    {amSet.map((element, i) => {
                                        readOnly = (element.name == "am") ? true : false;
                                        return (< NumberBoxComponent key={i} element={{
                                            name: element.name, des: element.des, value: this.state[`${element.name}`], readOnly
                                        }}
                                            onChange={(newValue) => { this.handleChangeInputValue(newValue, element.name) }}
                                            isBgSet={true} colClass="col-sm" bgColor="#BCFDF0"
                                            validationCallback={() => { }} />)
                                    })}
                                    {otherSet.map((element, i) => {
                                        required = (element.name == "a_bagwt") ? true : false;
                                        check = (element.name == "a_bagwt") ? true : false;
                                        return (< NumberBoxComponent key={i} element={{
                                            name: element.name, label: element.des, des: element.des, value: this.state[`${element.name}`], validate,
                                            required, check
                                        }}
                                            onChange={(newValue) => { this.handleChangeInputValue(newValue, element.name) }}
                                            isBgSet={true} colClass="col-sm" bgColor="#FAFBD0"
                                            validationCallback={res => this.setState({ [`${element.hasError}`]: res, validate: false })} />)
                                    })}
                                    {/* </div> */}
                                </div>
                            </fieldset>

                            <fieldset className="fieldSet">
                                <legend runat="server" visible="true" className="fieldsetLegend">Others:</legend>
                                <div className='row' style={{ justifyContent: "flex-end" }}>

                                    <SelectBoxComponent
                                        element={{ id: 'storage_location', label: "Storage Location", name: "storage_location", value: storage_location, validate: validate, required, check }}
                                        optionList={storage_locations}
                                        colClass="col-xl-2 col-lg-2"
                                        isBgSet={false}
                                        onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'storage_location') }}
                                        validationCallback={res => this.setState({ hasStorageLocError: res, validate: false })} />

                                    <SelectBoxComponent
                                        element={{ id: 'qc_name', label: "QC Name", name: "qc_name", value: qc_name, validate: validate, required, check }}
                                        optionList={qcNames}
                                        colClass="col-xl-2 col-lg-2"
                                        isBgSet={false}
                                        onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'qc_name') }}
                                        validationCallback={res => this.setState({ hasQCNameError: res, validate: false })} />


                                    <TextBoxComponent element={{ name: "freight", value: freight }}
                                        onChange={(newValue) => { this.handleChangeTextValue(newValue, 'freight') }}
                                        colClass="col-sm" isBgSet={false}
                                        validationCallback={() => { }} />


                                    <TextBoxComponent element={{ name: "vehicle_no", label: "Vehicle No", value: vehicle_no, validate, required, check }}
                                        onChange={(newValue) => { this.handleChangeTextValue(newValue, 'vehicle_no') }}
                                        colClass="col-sm" isBgSet={false}
                                        validationCallback={res => this.setState({ hasVehicleNoError: res, validate: false })} />

                                    <TextBoxComponent element={{ name: "transporter", value: transporter, validate, required, check }}
                                        onChange={(newValue) => { this.handleChangeTextValue(newValue, 'transporter') }}
                                        colClass="col-sm" isBgSet={false}
                                        validationCallback={res => this.setState({ hasTransporterError: res, validate: false })} />

                                    <TextBoxComponent element={{ name: "remarks", value: remarks }}
                                        onChange={(newValue) => { this.handleChangeTextValue(newValue, 'remarks') }}
                                        colClass="col-sm" isBgSet={false}
                                    />

                                </div>
                            </fieldset>


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

export default connect(mapStateToProps)(Inwards);
