import Logo from "./Logo";
import React from 'react';
import profileImage from '../../theme/images/dutch_admin/admin_profile.png';
import Logout from "../../pages/Logout";

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Logo />

                <div className="header">
                    <div className="header-content">
                        <nav className="navbar navbar-expand">
                            <div className="collapse navbar-collapse justify-content-between">
                                <div className="header-left">

                                </div>

                                <ul className="navbar-nav header-right">
                                    <li className="nav-item dropdown header-profile">
                                        <Logout />
                                        {/* <div className="dropdown-menu dropdown-menu-right">
                                            <a href="./app-profile.html" className="dropdown-item ai-icon">
                                                <svg id="icon-user1" xmlns="http://www.w3.org/2000/svg" className="text-primary"
                                                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                                    <circle cx="12" cy="7" r="4"></circle>
                                                </svg>
                                                <span className="ml-2">Profile </span>
                                            </a>
                                            <a href="./page-login.html" className="dropdown-item ai-icon">
                                                <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger"
                                                    width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                    <polyline points="16 17 21 12 16 7"></polyline>
                                                    <line x1="21" y1="12" x2="9" y2="12"></line>
                                                </svg>
                                                <span className="ml-2">Logout </span>
                                            </a>
                                        </div> */}
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>

            </div>
        );
    }
}


export default Header;

