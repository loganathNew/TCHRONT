import React, { Fragment, useState } from 'react';
import Content from '../../components/layouts/Content';
import { connect } from "react-redux";
import DataTable from '../../components/forms/cutomDatatable';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.state = {
            status: props.status,
        };
    }

    onStatusClose() {
        this.setState({ status: { show: false, type: 'success', msg: '' } });
    }

    render() {
        const tabelStyle = {
            minWidth: '845px'
        }

        return (

            <Content menu="Notes" action="List" status={this.state.status} onStatusClose={this.onStatusClose}
                list={
                    <DataTable />
                }
            />
        )

    }



}


const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(List);

