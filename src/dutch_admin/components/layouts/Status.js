import React from 'react';
import classnames from 'classnames';

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.onStatusClose = this.onStatusClose.bind(this);
    }

    onStatusClose() {
        this.props.onStatusClose()
    }

    render() {
        let type = this.props.status.type;
        let classType = (type == "error") ? "danger" : type;
        let show = this.props.status.show;
        let msg = this.props.status.msg;
        return (
            <div className={classnames("alert ",
                (!show) ? 'alert-hide' : '', `alert-${classType}`)
            }>
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                <strong style={{ textTransform: 'capitalize' }}>{type}</strong> {msg}
                <button type="button" className="close h-100" data-dismiss="alert" aria-label="Close" onClick={this.onStatusClose}>
                    <span><i className="mdi mdi-close"></i></span>
                </button>
            </div>
        );
    }
}

export default Status;