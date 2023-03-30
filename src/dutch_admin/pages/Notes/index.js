import React, { Fragment, useState } from 'react';
import { Textbox } from 'react-inputs-validation';
import CustomDateTimePicker from '../../components/forms/customDatetimepicker';
import Content from '../../components/layouts/Content';
import NotesDataService from '../../services/notes.service';
import { connect } from "react-redux";
import validator from '../../components/forms/validator';
import { Navigate } from 'react-router-dom';
import ButtonLoader from '../../components/layouts/ButtonLoader';

class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.saveNotes = this.saveNotes.bind(this);
        this.validateForm = this.validateForm.bind(this);
        //Parameters changes
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.handleDateTimeText = this.handleDateTimeText.bind(this);
        this.handleDateTime = this.handleDateTime.bind(this);
        this.state = {
            id: null,
            title: '',
            dateTime: new Date(),
            submitted: false,
            disabled: false,
            loader: false,
            status: props.status,
            hasTitleError: true,
            hasDateTimeError: true,
            showDateTimeErrorMsg: false,
            validate: false
        };
    }

    onChangeTitle(value) {
        this.setState({ title: value });
    }

    handleDateTime = (value) => {
        this.setState({ dateTime: value });
    }

    handleDateTimeText(value) {
        this.setState({ hasDateTimeError: value, showDateTimeErrorMsg: value })
    }

    setStatusMsg(type, msg) {
        this.setState({ status: { show: true, type: type, msg: msg } });
        setInterval(() => {
            this.emptyStatusMsg();
            if (type == "success") { this.setState({ submitted: true }) }
        }, 5000);
    }

    emptyStatusMsg() {
        this.setState({ status: { show: false, type: 'success', msg: '' } });
    }

    onStatusClose() {
        this.emptyStatusMsg();
    }

    saveNotes() {
        var data = {
            title: this.state.title,
            dateTime: this.state.dateTime
        };
        this.setState({ loader: true })
        this.setState({ disabled: true })
        NotesDataService.create(data, "notes")
            .then(response => {
                this.setStatusMsg("success", "Hi all")
            })
            .catch(e => {
                this.setState({ disabled: false })
                this.setStatusMsg("error", e)
            });
    }

    toggleValidating(validate) {
        this.setState({ validate });
    }

    validateForm(e) {
        e.preventDefault();
        this.toggleValidating(true);
        this.setState({ showDateTimeErrorMsg: true });
        const { hasTitleError } = this.state;
        const hasDateTimeError = (validator.empty(this.state.dateTime)) ? hasDateTimeError : false;
        if (
            !hasTitleError &&
            !hasDateTimeError
        ) {
            this.saveNotes();
        } else {
            this.setStatusMsg("info", "Please fill * field")
        }
    }

    render() {
        const { validate, showDateTimeErrorMsg, disabled } = this.state;
        const hasDateTimeError = (validator.empty(this.state.dateTime)) ? hasDateTimeError : false;
        return (
            <React.Fragment>
                <div>
                    {(this.state.submitted) ? <Navigate to={'/notes/list'} /> : ""}
                </div>
                <Content menu="Notes" action="Add"
                    status={this.state.status}
                    onStatusClose={this.onStatusClose}
                    submitted={this.state.submitted}
                    form={
                        <React.Fragment>
                            <div className="col-xl-4 col-lg-4">
                                <div className="form-group">
                                    <h2 className="card-title">Title <span className="text-danger">*</span></h2>
                                    <Textbox
                                        attributesInput={{
                                            className: 'form-control input-rounded',
                                            name: 'title',
                                            type: 'text',
                                            placeholder: 'Notes Title',
                                        }}
                                        onChange={(newValue) => {
                                            this.onChangeTitle(newValue)
                                        }}
                                        validate={validate}
                                        validationCallback={res =>
                                            this.setState({ hasTitleError: res, validate: false })
                                        }
                                        validationOption={{
                                            name: 'Title',
                                            check: true,
                                            required: true,
                                            msgOnError: "Please enter the title"
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-4">

                                {/* <div className="form-group">
                                <h2 className="card-title">Title <span className="text-danger">*</span></h2>
                                <CustomTextField
                                    InputProps={{
                                        name: "dateTime",
                                    }}
                                    required={true}
                                    onChangeText={this.handleDateTimeText}
                                />
                                {hasDateTimeError && showDateTimeErrorMsg ?
                                    <div className="react-inputs-validation__msg_identifier react-inputs-validation__msg react-inputs-validation__error">Please enter date time field</div> : ""
                                }
                            </div> */}
                            </div>

                            <div className="col-xl-4 col-lg-4">

                                <div className="form-group">
                                    <h2 className="card-title">Title <span className="text-danger">*</span></h2>
                                    <CustomDateTimePicker
                                        onChangeDateTime={this.handleDateTime}
                                        onChangeText={this.handleDateTimeText}
                                        dateTime={this.state.dateTime}
                                        hasDateTimeError={hasDateTimeError}
                                        showDateTimeErrorMsg={showDateTimeErrorMsg}
                                    />
                                </div>
                            </div>

                            {/* <div className="col-xl-4 col-lg-4">
                            <div className="form-group">
                                <h2 className="card-title">Title <span className="text-danger">*</span></h2>
                                <CustomDateTimePicker onChangeDateTime={this.handleDateTime} dateTime={this.state.dateTime} />
                            </div>
                        </div>


                        <div className="col-xl-4 col-lg-4">
                            <div className="form-group">
                                <h2 className="card-title">Title <span className="text-danger">*</span></h2>
                                <CustomDateTimePicker onChangeDateTime={this.handleDateTime} dateTime={this.state.dateTime} />
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-4">
                            <div className="form-group">
                                <h2 className="card-title">Title <span className="text-danger">*</span></h2>
                                <CustomDateTimePicker onChangeDateTime={this.handleDateTime} dateTime={this.state.dateTime} />
                            </div>
                        </div> */}
                        </React.Fragment>
                    }

                    submit={
                        <button onClick={this.validateForm} type="submit" className="btn btn-primary" disabled={disabled}>
                            {this.state.loader ? <ButtonLoader /> : "Submit"}
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

export default connect(mapStateToProps)(Notes);
