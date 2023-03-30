import Mainlogo from '../../theme/images/dutch_admin/logo-text.png';
import classnames from 'classnames';
import React from 'react';
import { connect } from "react-redux";
import hamActivationAction from '../../store/actions';

class Toplogo extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const isHamActive = this.props.hamActive
        return (
            <div className="nav-header">
                <a href="index.html" className="brand-logo">
                    {
                        isHamActive ?
                            <img className="logo-abbr" src={Mainlogo} alt="" />
                            :
                            <img className="logo-abbr" src={Mainlogo} alt="" />
                        // <React.Fragment>
                        //     {/* <img className="logo-compact" src={Mainlogo} alt="" /> */}
                        //     <img className="brand-title" src={Mainlogo} alt="" />
                        // </React.Fragment>
                    }
                </a>

                <div className="nav-control">
                    <div className={classnames("hamburger", this.props.hamActive ? 'is-active' : '')} onClick={
                        () => this.props.hamActivationAction(!this.props.hamActive)
                    }
                    >
                        <span className="line"></span><span className="line"></span><span className="line"></span>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    hamActivationAction: (payload) => dispatch(hamActivationAction(payload))
});


export default connect(mapStateToProps, mapDispatchToProps)(Toplogo);
