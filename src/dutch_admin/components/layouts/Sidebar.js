import Logo from '../../theme/images/dutch_admin/logo.png';
import React from 'react';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import Menu from './Menu';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        let year = date.getFullYear();
        this.state = {
            year: year
        }
    }
    render() {
        return (
            <div className="deznav">
                <div className="deznav-scroll ps">
                    <PerfectScrollbar>
                        <Menu />
                        {/* <div className="add-menu-sidebar">
                            <img src={Logo} alt="" /> 
                            <p><strong>Dutch Plantin Admin Dashboard</strong></p>
                        </div> */}
                        <div className="copyright">
                            <p> © {this.state.year} All Rights Reserved</p>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div >
        );
    }
}

export default Sidebar;