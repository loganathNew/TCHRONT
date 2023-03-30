import React, { Fragment, useState } from 'react';
import Content from '../../components/layouts/Content';
import { connect } from "react-redux";

import homeService from '../../services/home.service';


class List extends React.Component {

    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
        this.state = {
            status: props.status,
            logs: [],
        };

    }

    onStatusClose() {
        this.setState({ status: { show: false, type: 'success', msg: '' } });
    }

    componentDidMount() {
        this.getListDatas();
    }

    getListDatas() {
        (async () => {
            const response = await homeService.getLogFiles();
            let logs = await response.data.results;
            // console.log(logs)
            this.setState({ logs: logs })
        })();
    }

    render() {
        return (

            <Content menu="Logs" action="List" status={this.state.status} onStatusClose={this.onStatusClose}
                form=
                {
                    (this.state.logs.length > 0) ?
                        this.state.logs.map((element, i) => {
                            return (
                                <div key={i} className="col-sm-2">
                                    <div style={{ 'paddingBottom': "20px" }}>
                                        <a href={element.path} target="_blank" download={element.name}>
                                            {element.name}
                                        </a>
                                    </div>
                                </div >
                            )
                        }) : ""
                }
            />
        )

    }



}


const mapStateToProps = state => ({
    ...state
});

export default connect(mapStateToProps)(List);

