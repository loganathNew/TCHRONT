import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized";
import { useAuth } from "../provider/AuthProvider";

const Authorization = ({ permissions }) => {
    const { user } = useAuth();
    const location = useLocation();
    if (user && user.token) {
        const userpermission = user.permissions;
        const isAllowed = permissions.some((allowed) => userpermission.includes(allowed));
        return isAllowed ? <Outlet /> : <Unauthorized />;
    }
    // console.log(user);
    // return <div>'cvv</div>
    return <Navigate to="/login" state={{ path: location.pathname }} replace />;
};
export default Authorization;
