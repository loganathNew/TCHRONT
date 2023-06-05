import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import authAction from "../store/actions/auth";

const AuthContext = createContext("");

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        ...auth
    });

    useEffect(() => {
        //console.log(auth);
        let userInfo = {
            user_name: auth.user_name, user_id: auth.user_id, user_role: auth.user_role, token: auth.token, permissions: auth.permissions,
        }
        setUser({ ...userInfo });
    }, []);

    async function setLocalStorage(userInfo, redirectPath) {
        window.localStorage.setItem("token", userInfo.token);
        window.localStorage.setItem("user_name", userInfo.user_name);
        window.localStorage.setItem("user_role", userInfo.user_role);
        window.localStorage.setItem("user_id", userInfo.user_id);
        window.localStorage.setItem("permissions", JSON.stringify(userInfo.permissions));

    }

    const login = async (user) => {
        let userInfo = { ...auth }
        let redirectPath = location.state?.path || "/";
        if (user.user_role === "admin") {
            userInfo = {
                token: user.token, user_name: user.user_name, user_role: user.user_role, user_id: user.user_id, permissions: [
                    'view_user', 'view_dashboard', 'view_item', 'view_location',
                    'view_qcname', 'view_storagelocation',
                    'view_supplier', 'view_inward', 'view_outward', 'view_inter', 'view_log', 'view_balance']
            };
            // userInfo = {
            //     token: "dsdsdsffdf", user_name: "adminUser", user_role: 'admin', user_id: 1, permissions: ['view_dashboard', 'view_item', 'view_location',
            //         'view_qcname', 'view_storagelocation',
            //         'view_supplier', 'view_inward', 'view_outward', 'view_inter']
            // };
        } else {
            // userInfo = { token: user.token, user_name: user.user_name, user_role: user.user_role, user_id: user.user_id, permissions: ['view_dashboard', 'view_inward', 'view_outward', 'view_inter'] };
            userInfo = { token: user.token, user_name: user.user_name, user_role: user.user_role, user_id: user.user_id, permissions: ['view_dashboard', 'view_inward', 'view_outward', 'view_inter', 'view_log'] };
            redirectPath = "/";
        }
        setUser({ ...userInfo });
        let dispatchUser = { ...userInfo };
        // console.log("dispatchUser");
        // console.log(dispatchUser);
        dispatch(authAction(dispatchUser))
        await setLocalStorage(userInfo, redirectPath);
        navigate(redirectPath, { replace: true });
        window.location.reload();
        // window.location.href = redirectPath;
        // window.location.reload();
    };

    const logout = (user) => {
        let userInfo = { token: user.token, user_name: user.user_name, user_role: user.user_role, user_id: user.user_id, permissions: [] };
        setUser({ ...userInfo });
        let dispatchUser = { ...userInfo };
        // console.log("dispatchUser");
        // console.log(dispatchUser);
        dispatch(authAction(dispatchUser))
        window.localStorage.setItem("token", userInfo.token);
        window.localStorage.setItem("user_name", userInfo.user_name);
        window.localStorage.setItem("user_role", userInfo.user_role);
        window.localStorage.setItem("user_id", userInfo.user_id);
        window.localStorage.setItem("permissions", JSON.stringify(userInfo.permissions));
    };

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    // console.log(AuthContext);
    return useContext(AuthContext);
};
