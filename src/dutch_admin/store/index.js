import { createStore } from "redux";
import reducer from "./reducers";



// let userInfo = {
//     username: "", role: "", permissions: [],
// }
// let logged = window.localStorage.getItem("logged");
let token = window.localStorage.getItem("token");
let user_name = window.localStorage.getItem("user_name");
let user_role = window.localStorage.getItem("user_role");
let user_id = window.localStorage.getItem("user_id");
let permissions = JSON.parse(window.localStorage.getItem("permissions"));
// console.log(userInfo);
// if (userInfo && userInfo.username) {
//     // userInfo = { username: "user", role: "user", permissions: ['view_inward', 'view_outward', 'view_inter'] };
//     userInfo = window.localStorage.getItem("userInfo");
// }
// console.log("userInfo");
// console.log(permissions);
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
