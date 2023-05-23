import { createStore } from "redux";
import reducer from "./reducers";

let token = window.localStorage.getItem("token");
let user_name = window.localStorage.getItem("user_name");
let user_role = window.localStorage.getItem("user_role");
let user_id = window.localStorage.getItem("user_id");
let permissions = (window.localStorage.getItem("permissions") != "" && window.localStorage.getItem("permissions").length != 0) ? JSON.parse(window.localStorage.getItem("permissions")) : [];

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

function configureStore() {
    return createStore(reducer, state);
}

export default configureStore;
