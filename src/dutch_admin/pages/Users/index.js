import React, { Fragment, useState } from 'react';
import { Textbox } from 'react-inputs-validation';
import Content from '../../components/layouts/Content';
import UsersDataService from '../../services/user.service';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';
import { SelectBoxComponent } from '../../components/forms/formboxComponent';

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveUsers = this.saveUsers.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //Parameters changes
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeLoginId = this.onChangeLoginId.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);
        this.state = {
            submitted: false,
            disabled: false,
            loader: false,
            status: props.status,
            validate: false,
            //Parameter
            id: null,
            name: '',
            login_id: '',
            password: '',
            role: "2",
            password_request: false,
            hasNameError: true,
            hasLoginIdError: true,
            hasPasswordError: true,
            hasRoleError: true,
            roles: [{ id: "2", name: 'user' }]
        };

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
    onChangeName(value) {
        this.setState({ name: value });
    }

    onChangeLoginId(value) {
        this.setState({ login_id: value });
    }

    onChangePassword(value) {
        this.setState({ password: value, password_request: true });
    }

    onChangeRole(value) {
        this.setState({ role: value });
    }

    dataInit(id) {
        UsersDataService.get(id)
            .then(response => {
                let updateData = response.data.data;
                if (updateData == null || updateData == [] || updateData == undefined) {
                    this.submitDisable(true)
                    this.setStatusMsg("danger", "Something went wrong")
                    return;
                }
                this.setState(updateData)
                this.submitDisable(false)
                this.setState({ hasNameError: false, hasLoginIdError: false, hasPasswordError: false, hasRoleError: false })
            })
            .catch(e => {
                console.log(e);
                this.submitDisable(true)
                this.setStatusMsg("danger", "Something went wrong")
            });
    }

    saveUsers() {
        this.submitDisable(true)
        var data = {
            name: this.state.name,
            login_id: this.state.login_id,
            password: this.state.password,
            password_request: this.state.password_request,
            role: this.state.role,
        };
        let callApi = (this.state.id != null) ?
            UsersDataService.update(this.state.id, data) :
            UsersDataService.create(data);

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
            this.saveUsers();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    checkAllParam() {
        const { hasNameError, hasLoginIdError, hasPasswordError, hasRoleError } = this.state;
        return (
            !hasNameError &&
            !hasLoginIdError &&
            !hasPasswordError &&
            !hasRoleError
        ) ? true : false;
    }

    render() {
        const { validate, disabled, loader, submitted, roles, role } = this.state;
        let required = true;
        let check = true;
        return (
            <React.Fragment>
                <div>
                    {(submitted) ? <Navigate to={'/Users/list'} /> : ""}
                </div>
                <Content menu="Users" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={submitted}
                    form={
                        <React.Fragment>
                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Name <span className="text-danger">*</span></h2>
                                    <Textbox
                                        attributesInput={{ name: 'name', type: 'text', placeholder: 'Name', className: 'form-control input-rounded' }}
                                        onChange={(newValue) => { this.onChangeName(newValue) }}
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
                                    <h2 className="card-title">Login ID <span className="text-danger">*</span></h2>
                                    <Textbox
                                        attributesInput={{ name: 'login_id', type: 'text', placeholder: 'Login Id', className: 'form-control input-rounded' }}
                                        onChange={(newValue) => { this.onChangeLoginId(newValue) }}
                                        onBlur={e => { }}
                                        validate={validate}
                                        value={this.state.login_id}
                                        validationCallback={res => this.setState({ hasLoginIdError: res, validate: false })}
                                        validationOption={{ name: 'login_id', required: true, msgOnError: "Please enter the Login ID" }}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Password <span className="text-danger">*</span></h2>
                                    <Textbox
                                        attributesInput={{ name: 'password', type: 'password', placeholder: '********', className: 'form-control input-rounded' }}
                                        onChange={(newValue) => { this.onChangePassword(newValue) }}
                                        onBlur={e => { }}
                                        validate={validate}
                                        value={this.state.password}
                                        validationCallback={res => this.setState({ hasPasswordError: res, validate: false })}
                                        validationOption={{ name: 'password', required: true }}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Role <span className="text-danger">*</span></h2>
                                    <SelectBoxComponent
                                        element={{ id: 'role', name: "role", value: role, validate, required, check }}
                                        optionList={roles}
                                        colClass="col-xl-4 col-lg-4"
                                        isBgSet={false}
                                        onChange={(newValue) => { this.onChangeRole(newValue) }}
                                        validationCallback={res => this.setState({ hasRoleError: res, validate: false })} />
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

export default connect(mapStateToProps)(Users);
