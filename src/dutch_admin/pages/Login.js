import React, { useState } from "react";
import { useAuth, AuthProvider } from "../provider/AuthProvider";
import authService from "../services/auth.service";
import Mainlogo from '../theme/images/dutch_admin/logo-text.png';
import Preloader from "../components/layouts/Preloader";
import { useSelector } from 'react-redux';
import Status from "../components/layouts/Status";


const Login = () => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [password, setPassword] = useState(null);
    const [status, setStatus] = useState(useSelector((state) => state.status));
    const { login } = useAuth();
    // const navigate = useNavigate();
    // const location = useLocation();
    // const redirectPath = location.state?.path || "";
    const handleLogin = () => {
        setLoader(true);
        setDisabled(true);
        let data = { username: user, password: password };
        authService.checkAuth(data)
            .then(async (res) => {
                // console.log(res);
                if (res.data.type == 'success') {
                    let userInfo = {
                        token: res.data.data.token,
                        user_name: res.data.data.user_name,
                        user_role: res.data.data.user_role,
                        user_id: res.data.data.user_id,
                    };
                    setStatus({ show: true, type: 'success', msg: res.data.msg })
                    login(userInfo);
                } else {
                    setLoader(false);
                    setDisabled(false);
                    setStatus({ show: true, type: 'error', msg: res.data.msg })
                }
            })
            .catch(e => {
                setLoader(false);
                setDisabled(false);
                setStatus({ show: true, type: 'error', msg: "Something went wrong" })
            });
    };

    const onStatusClose = () => {
        setStatus({ show: false, type: 'success', msg: '' })
    };

    return (
        <>
            {/* <body class="h-100"> */}
            {loader ? <Preloader /> : ""}
            <div className="login-bckimg">

                <div className="authincation h-50" style={{ opacity: 1.5, marginTop: "75px" }}>
                    <div className="container h-50">
                        <div className="row justify-content-center h-50 align-items-center">

                            <div className="col-md-6">
                                <Status status={status} onStatusClose={onStatusClose} />
                                <div className="authincation-content">
                                    <div className="row no-gutters">
                                        <div className="col-xl-12" style={{ zIndex: "10", position: "absolute" }}>
                                            <div className="auth-form">
                                                <img className="logo-abbr" src={Mainlogo} alt="" />

                                                {/* <h3 className="text-center mb-4">Dutch Plantin Sign in</h3> */}
                                                <div className="form-group">
                                                    <label className="mb-1 text-yellow"><strong>Login Id <span className="text-danger">*</span></strong></label>
                                                    <input type="text" className="form-control" style={{ borderRadius: '25px' }} onChange={(e) => setUser(e.target.value)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="mb-1 text-yellow"><strong>Password <span className="text-danger">*</span></strong></label>
                                                    <input type="password" style={{ borderRadius: '25px' }} className="form-control" onChange={(e) => setPassword(e.target.value)} />
                                                </div>
                                                <div className="text-center">
                                                    <button type="submit" style={{ borderRadius: '25px' }} className="btn btn-primary btn-block" onClick={handleLogin} disabled={disabled}>
                                                        Login
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* </body> */}
        </>
    );
};
export default Login;