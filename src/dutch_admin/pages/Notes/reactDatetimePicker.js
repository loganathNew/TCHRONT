import React, { Fragment, useState } from 'react';
import { Textbox } from 'react-inputs-validation';

import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';
import "react-calendar/dist/Calendar.css";
import "../../theme/css/react-calendar.css";
import "react-clock/dist/Clock.css";
import "../../theme/css/react-datetime-picker.css";

class Notes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedDate: new Date()
        };
    }

    handleDateChange(value) {
        this.setState({
            selectedDate: value
        });
    }


    render() {
        return (
            <div className="content-body">
                <div className="container-fluid">
                    <div className="row page-titles mx-0">
                        <div className="col-sm-6 p-md-0">
                            <div className="welcome-text">
                                <h4>Hi, welcome back!</h4>
                                <span>Element</span>
                            </div>
                        </div>
                        <div className="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="/">Notes</a></li>
                                <li className="breadcrumb-item active"><a href="/">Add</a></li>
                            </ol>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Title <span className="text-danger">*</span></h4>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <div className="form-group">
                                            <Textbox
                                                attributesInput={{
                                                    className: 'form-control input-rounded',
                                                    name: 'title',
                                                    type: 'text',
                                                    placeholder: 'Notes Title',
                                                }}
                                                value=""
                                                onChange={(title, e) => {
                                                    // console.log(title);
                                                    console.log(e);
                                                }}
                                                onBlur={(e) => { console.log(e) }}
                                                validationOption={{
                                                    name: 'Title',
                                                    check: true,
                                                    required: true,
                                                    msgOnError: "Please enter the title"
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h4 className="card-title">Specify Date (Remain to this date)</h4>
                                </div>
                                <div className="card-body">
                                    <div className="basic-form">
                                        <div className="form-group">
                                            <DateTimePicker
                                                onChange={this.handleDateChange.bind(this)}
                                                value={this.state.selectedDate}
                                                className='form-control input-rounded' 
                                                format="MMMM dd y HH:mm"
                                                renderNumbers="true"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-lg-8 ml-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Notes;