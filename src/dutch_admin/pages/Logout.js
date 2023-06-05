import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import adminImage from '../theme/images/dutch_admin/admin_profile.png';
import userImage from '../theme/images/dutch_admin/user.png';
import { useSelector } from 'react-redux';
import authService from "../services/auth.service";
import Preloader from "../components/layouts/Preloader";
import Status from "../components/layouts/Status";

const Logout = () => {
    const { user, logout } = useAuth();
    const [loader, setLoader] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [status, setStatus] = useState(useSelector((state) => state.status));
    const auth = useSelector((state) => state.auth)

    const logoutHandler = () => {
        setLoader(true);
        setDisabled(true);
        let data = { user_id: auth.user_id };
        authService.logOut(data)
            .then(async (res) => {
                if (res.data.type == 'success') {
                    let userInfo = {
                        token: res.data.data.token,
                        user_name: res.data.data.user_name,
                        user_role: res.data.data.user_role,
                        user_id: res.data.data.user_id,
                    };
                    setStatus({ show: true, type: 'success', msg: res.data.msg })
                    logout(userInfo);
                } else {
                    setLoader(false);
                    setDisabled(false);
                    setStatus({ show: true, type: 'error', msg: res.data.msg })
                    window.location.reload();
                }
            })
            .catch(e => {
                setLoader(false);
                setDisabled(false);
                setStatus({ show: true, type: 'error', msg: "Something went wrong" })
                window.location.reload();
            });
    };

    const onStatusClose = () => {
        setStatus({ show: false, type: 'success', msg: '' })
    };


    return (
        <>
            {loader ? <Preloader /> : ""}
            <Status status={status} onStatusClose={onStatusClose} />

            <a className="nav-link" href="#/">
                <div className="header-info">
                    <span>Hello, <strong>{user.user_name}</strong></span>
                </div>
                {
                    (user.user_role === "admin") ?
                        <img src={adminImage} width="20" alt="" /> :
                        <img src={userImage} alt="" />
                }
            </a>&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="submit" onClick={logoutHandler} style={{ backgroundColor: "black", cursor: 'pointer' }}>
                <svg id="icon-logout" xmlns="http://www.w3.org/2000/svg" className="text-danger" width="28" height="28"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>

        </>
    );
};
export default Logout;