import React from 'react';
import Content from '../../components/layouts/Content';
import OutwardsDataService from '../../services/outward.service';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import Preloader from '../../components/layouts/Preloader';

import "react-inputs-validation/lib/react-inputs-validation.min.css";
import CustomDatePicker from '../../components/forms/customDatepicker';
import { TextBoxComponent, SelectBoxComponent, OutwardItemComponent } from '../../components/forms/formboxComponent';
import homeService from '../../services/home.service';



class Outwards extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveOutwards = this.saveOutwards.bind(this);
        this.validateForm = this.validateForm.bind(this);

        //Parameters changes
        this.handleDate = this.handleDate.bind(this);
        this.handleDateText = this.handleDateText.bind(this);

        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
        this.handleChangeSelectValue = this.handleChangeSelectValue.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);


        this.FieldItemcomponent = React.createRef();

        this.state = {
            submitted: false, disabled: false, loader: false, status: props.status, validate: false,
            //Arrays
            products: [{
                id: "",
                items: [],
                location_id: "", gb_size: "", mixture: "", quality: "", plant_hole: "", pcs_pallet: 0, pallet: 0, total_pcs: 0, nwt: 0, remarks: "",
                hasItemError: true, hasGBSizeError: true, hasQualityError: true, hasPlantHoleError: true,
                hasPCSPalletError: true, hasPalletError: true, hasTotalPCSError: true, hasNWTError: true,
                validate: false
            }],
            //Parameter
            id: null,
            date: new Date(), inv_no: "", project_no: "",
            vehicle_no: "", container_no: "",

            //Error
            showDateErrorMsg: false,
            hasLocationError: true, hasInvnoError: true,
            hasProjectNoError: true,
            hasContainerNoError: true, hasVehicleNoError: true,
            items: [], locations: [], deletedIds: [],
        };
        //this.state = testData;
    }

    //Date Funciton
    handleDate = (value) => {
        this.setState({ date: value });
    }

    handleDateText(value) {
        this.setState({ hasDateError: value, showDateErrorMsg: value })
    }


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
            this.dataInit(id)
            // this.getSelectDatas();
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

    //Parameter Funciton
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
        OutwardsDataService.get(id)
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

                updatedData.hasInvnoError = false;
                updatedData.hasProjectNoError = false;
                updatedData.hasContainerNoError = false;
                updatedData.hasVehicleNoError = false;
                // this.FieldItemcomponent.current = new_products;
                // console.log(new_products);
                // console.log(updatedData);
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
                var itemsArray = [];
                for (var propName in product.items) {
                    if (product.items.hasOwnProperty(propName)) {
                        itemsArray[propName] = product.items[propName];
                    }
                }
                product.items = itemsArray;
                new_products.push({
                    ...product,
                    hasGBSizeError: false, hasQualityError: false, hasPlantHoleError: false,
                    hasPCSPalletError: false, hasPalletError: false, hasTotalPCSError: false, hasNWTError: false,
                    hasItemIDError: false
                });
            });
        } else { new_products = this.state.products; }
        return new_products;
    }


    saveOutwards() {
        this.submitDisable(true)

        var data = this.state;
        // console.log(data);
        var products = this.FieldItemcomponent.current;
        var deletedIds = this.FieldItemcomponent.current.deletedIds;
        // console.log(products);
        // console.log(deletedIds);
        // var products = (this.state.id) ? this.state.products : this.FieldItemcomponent.current;
        data['products'] = products;
        data['deletedIds'] = deletedIds;

        let callApi = (this.state.id != null) ?
            OutwardsDataService.update(this.state.id, data) :
            OutwardsDataService.create(data);

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
        // console.log(this.FieldItemcomponent);

        this.toggleValidating(true);
        // console.log(this.checkAllParam());
        if (this.checkAllParam() == true) {
            this.saveOutwards();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    checkAllParam() {
        const {
            hasInvnoError, hasLocationError,
            hasProjectNoError,
            hasContainerNoError, hasVehicleNoError,
        } = this.state;

        let itemArrays = this.FieldItemcomponent.current;
        let hasItemComponentError = true;
        if (itemArrays) {
            itemArrays.map((e, i) => {
                // console.log(e.hasGBSizeError + " " + e.hasQualityError + " " + e.hasPlantHoleError + " " + e.hasPCSPalletError + " " + e.hasPalletError + "" + e.hasTotalPCSError + " " + e.hasNWTError + " " + e.hasItemIDError)
                hasItemComponentError = (!e.hasGBSizeError && !e.hasQualityError && !e.hasPlantHoleError &&
                    !e.hasPCSPalletError && !e.hasPalletError && !e.hasTotalPCSError && !e.hasNWTError && !e.hasItemIDError) ? false : true;
                return hasItemComponentError;
            });
        }

        return (
            !hasInvnoError && !hasProjectNoError && !hasContainerNoError && !hasVehicleNoError && !hasLocationError &&
            !hasItemComponentError
        ) ? true : false;
    }


    render() {
        const { date, inv_no, project_no, location_id,
            vehicle_no, container_no, remarks,
            hasDateError,
            showDateErrorMsg,
            disabled, loader, submitted,
            validate,
            locations, items, deletedIds } = this.state;

        let readOnly = true;
        let required = true;
        let check = true;
        return (
            <React.Fragment>
                <div>
                    {(submitted) ? <Navigate to={'/Outwards/list'} /> : ""}
                </div>
                <Content menu="Outwards" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={submitted}
                    form={
                        <React.Fragment>
                            {loader ? <Preloader /> : ""}
                            <div className='row'>
                                <SelectBoxComponent
                                    element={{ id: 'location_id', label: "Location ID", name: "location_id", value: location_id, validate, required, check }}
                                    optionList={locations}
                                    colClass="col-xl-2 col-lg-2"
                                    isBgSet={false}
                                    onChange={(newValue) => { this.handleChangeSelectValue(newValue, 'location_id') }}
                                    validationCallback={res => this.setState({ hasLocationError: res, validate: false })} />

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

                                <TextBoxComponent element={{ name: "project_no", label: "Project No", value: project_no, validate, required, check }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'project_no') }}
                                    colClass="col-xl-2 col-lg-2" isBgSet={false}
                                    validationCallback={res => this.setState({ hasProjectNoError: res, validate: false })} />

                                <TextBoxComponent element={{ name: "vehicle_no", label: "Vehicle No", value: vehicle_no, validate, required, check }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'vehicle_no') }}
                                    colClass="col-xl-2 col-lg-2" isBgSet={false}
                                    validationCallback={res => this.setState({ hasVehicleNoError: res, validate: false })} />

                                <TextBoxComponent element={{ name: "container_no", label: "Container No", value: container_no, validate, required, check }}
                                    onChange={(newValue) => { this.handleChangeTextValue(newValue, 'container_no') }}
                                    colClass="col-xl-2 col-lg-2" isBgSet={false}
                                    validationCallback={res => this.setState({ hasContainerNoError: res, validate: false })} />

                            </div>

                            <OutwardItemComponent ref={this.FieldItemcomponent} products={this.state.products} items={items} deletedIds={deletedIds} />
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

export default connect(mapStateToProps)(Outwards);
