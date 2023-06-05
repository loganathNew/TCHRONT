import { createStore } from "redux";
import reducer from "./reducers";
import authService from "../services/auth.service";

// (async () => {
    let user_id = window.localStorage.getItem("user_id");
    let token = window.localStorage.getItem("token");
    let user_name = window.localStorage.getItem("user_name");
    let user_role = window.localStorage.getItem("user_role");
    let permissions = JSON.parse(window.localStorage.getItem("permissions"));

//     const response = await authService.checking_authenticate({ user_id: user_id });
//     let user = await response.data.user;

//     if (user == null) {
//         console.log(user);
//         token = "";
//         user_name = "";
//         user_role = "";
//         user_id = "";
//         permissions = [];
//     }


    let state = {
        hamActive: true,
        status: {
            show: false,
            type: 'success',
            msg: '',
        },
        auth: {
            token: token,
            user_name: user_name,
            user_role: user_role,
            user_id: user_id,
            permissions: permissions,
        }
    }
        // console.log("state");
        // console.log(state);

// })();


function configureStore() {
    return createStore(reducer, state);
}

export default configureStore;
