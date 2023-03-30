import React, { Fragment, useState } from 'react';
import { Textbox } from 'react-inputs-validation';
import Content from '../../components/layouts/Content';
import MastersDataService from '../../services/master.service';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import Preloader from '../../components/layouts/Preloader';

class Masters extends React.Component {
    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveMasters = this.saveMasters.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //Parameters changes
        this.handleChangeInputValue = this.handleChangeInputValue.bind(this);
        this.handleChangeTextValue = this.handleChangeTextValue.bind(this);
        this.state = {
            master: props.master,
            submitted: false,
            disabled: false,
            loader: false,
            status: props.status,
            validate: false,
            //Parameter
            id: null,
            name: '',
            des: '',
            value: 0,
            hasNameError: true,
        };

    }


    UNSAFE_componentWillReceiveProps(nextProps) {
        let menu = (window.location.pathname.split('/')[1]) ? window.location.pathname.split('/')[1] : nextProps.master;
        this.setState({ master: menu });
    }

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
        if (id != null) {
            this.submitDisable(true)
            this.dataInit(id)
        }
    }

    //Parameter Funciton
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
        MastersDataService.get(id, this.state.master)
            .then(response => {
                let updateData = response.data.data;
                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.submitDisable(true)
                    this.setStatusMsg("danger", "Something went wrong")
                    return;
                }
                this.setState(updateData)
                this.submitDisable(false)
                this.setState({ hasNameError: false, hasLoginIdError: false, hasPasswordError: false })
            })
            .catch(e => {
                console.log(e);
                this.submitDisable(true)
                this.setStatusMsg("danger", "Something went wrong")
            });
    }

    saveMasters() {
        this.submitDisable(true)
        var data = {
            name: this.state.name,
            des: this.state.des,
            value: this.state.value,
        };
        let callApi = (this.state.id != null) ?
            MastersDataService.update(this.state.id, data, this.state.master) :
            MastersDataService.create(data, this.state.master);

        callApi.then(response => {
            let data = response.data;
            // console.log(data);
            if (data.errors) {
                this.setStatusMsg("error", data.errors)
                this.submitDisable(false)
                return;
            } else {
                this.setStatusMsg("success", data.msg)
            }
        })
            .catch(e => {
                this.submitDisable(false)
                this.setStatusMsg("danger", "Something went wrong")
            });
    }

    toggleValidating(validate) {
        this.setState({ validate });
    }

    validateForm(e) {
        e.preventDefault();
        this.toggleValidating(true);
        this.checkAllParam();
        if (this.checkAllParam() == true) {
            this.saveMasters();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    checkAllParam() {
        const { hasNameError } = this.state;
        return (
            !hasNameError
        ) ? true : false;
    }

    render() {
        const { validate, disabled, loader, submitted } = this.state;
        return (
            <React.Fragment>
                <div>
                    {(submitted) ? <Navigate to={'/' + this.state.master + '/list'} /> : ""}
                </div>
                <Content menu="Masters" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={submitted}
                    master={this.state.master}
                    form={
                        <React.Fragment>
                            {loader ? <Preloader /> : ""}
                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Name <span className="text-danger">*</span></h2>
                                    <Textbox
                                        attributesInput={{ name: 'name', type: 'text', placeholder: 'Name', className: 'form-control input-rounded' }}
                                        onChange={(newValue) => { this.handleChangeTextValue(newValue, 'name') }}
                                        onBlur={e => { }}
                                        validate={validate}
                                        value={this.state.name}
                                        validationCallback={res => this.setState({ hasNameError: res, validate: false })}
                                        validationOption={{ name: 'name', required: true, msgOnError: "Please enter the name" }}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Description </h2>
                                    <Textbox
                                        attributesInput={{ name: 'des', type: 'text', placeholder: 'Description', className: 'form-control input-rounded' }}
                                        onChange={(newValue) => { this.handleChangeTextValue(newValue, 'des') }}
                                        onBlur={e => { }}
                                        value={this.state.des}
                                        validationCallback={() => { }}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Value </h2>
                                    <Textbox
                                        attributesInput={{ name: 'value', type: 'number', placeholder: '0', className: 'form-control input-rounded' }}
                                        onChange={(newValue) => { this.handleChangeInputValue(newValue, 'value') }}
                                        onBlur={e => { }}
                                        value={this.state.value}
                                        validationCallback={() => { }}
                                    />
                                </div>
                            </div>


                        </React.Fragment>
                    }

                    submit={
                        <button onClick={this.validateForm} type="submit" className="btn btn-primary" disabled={disabled}>
                            {loader ? <ButtonLoader /> : "Submit"}
                        </button>
                    }
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(Masters);
