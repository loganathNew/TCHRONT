import React, { Fragment, useState } from 'react';
import Breadcrumbs from '../../components/layouts/Breadcrumbs';
import Status from './Status';
import Preloader from './Preloader';
import ButtonLoader from './ButtonLoader';

class Content extends React.Component {
    constructor(props) {
        super(props);
        // console.log(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.filterToChange = this.filterToChange.bind(this);
        this.filterItemChange = this.filterItemChange.bind(this);
        this.filterFromChange = this.filterFromChange.bind(this);
        this.filterToChange = this.filterToChange.bind(this);
        this.filterLocationChange = this.filterLocationChange.bind(this);
        this.filterItemChange = this.filterItemChange.bind(this);
        this.filterStartDateChange = this.filterStartDateChange.bind(this);
        this.filterEndDateChange = this.filterEndDateChange.bind(this);
        this.filterClick = this.filterClick.bind(this);
        this.state = { loader: true };
    }


    componentDidMount() {
        this.setState({ loader: false })
    }

    onStatusClose() {
        this.props.onStatusClose();
    }

    filterLocationChange(value) {
        this.props.filterLocationChange(value);
    }

    filterFromChange(value) {
        this.props.filterFromChange(value);
    }

    filterToChange(value) {
        this.props.filterToChange(value);
    }

    filterItemChange(value) {
        this.props.filterItemChange(value);
    }

    filterStartDateChange = (value) => {
        this.props.filterStartDateChange(value);
    }

    filterEndDateChange = (value) => {
        this.props.filterEndDateChange(value);
    }


    filterClick = () => {
        this.props.filterClick();
    }

    render() {
        return (
            <div className="content-body" >
                <div className="container-fluid">
                    {/* {this.props.menu == "Inwards" ? "" : <Breadcrumbs menu={this.props.menu} action={this.props.action} />} */}
                    <Breadcrumbs menu={this.props.menu} master={this.props.master} action={this.props.action} totalInwardNet={this.props.totalInwardNet}
                        totalOutwardNet={this.props.totalOutwardNet}
                        filterLocationChange={(newValue) => { this.filterLocationChange(newValue) }}
                        filterFromChange={(newValue) => { this.filterFromChange(newValue) }}
                        filterToChange={(newValue) => { this.filterToChange(newValue) }}
                        filterItemChange={(newValue) => { this.filterItemChange(newValue) }}
                        filterStartDateChange={(newValue) => { this.filterStartDateChange(newValue) }}
                        filterEndDateChange={(newValue) => { this.filterEndDateChange(newValue) }}
                        filterClick={this.filterClick}
                    />
                    <Status status={this.props.status} onStatusClose={this.onStatusClose} />
                    {
                        this.props.form ?
                            <div className="row">
                                <div className="col-xl-12 col-lg-12">
                                    <div className="card" style={this.props.menu == "Outwards" ? { backgroundColor: '#D0F5B1' } : {}}>
                                        {/* <div className="card-body" style={this.props.menu == "Inwards" ? { padding: '0.900rem' } : ""}> */}
                                        < div className="card-body">
                                            <div className="basic-form">

                                                {(this.props.menu == "Inwards" || this.props.menu == "Outwards") ?
                                                    this.props.form
                                                    :
                                                    <div className="row">
                                                        {this.props.form}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row">
                                {this.state.loader ? <Preloader /> : ""}

                                <div className="col-12">
                                    <div className="card" style={{ backgroundColor: "#fff" }}>
                                        <div className="card-body">
                                            {/* <div className="table-responsive"> */}
                                            {this.props.list}
                                            {/* </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
                {
                    this.props.form ?
                        <div className="form-group row" style={{ justifyContent: "flex-end" }}>
                            <div className="col-xl-2 col-lg-2">
                                {this.props.submit}
                            </div>
                        </div>
                        : ""
                }
            </div >
        )
    }
}

export default Content;