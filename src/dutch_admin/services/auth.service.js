import http from "../../http-common";

class AuthDataService {
    checkAuth(data) {
        return http.post("/auth/check", data);
    }

    checking_authenticate(data){
        return http.post("/auth/checking" ,data);
    }

    logOut(data) {
        return http.post("/auth/logout", data);
    }
}

export default new AuthDataService();
