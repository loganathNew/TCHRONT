import http from "../../http-common";

class AuthDataService {
    checkAuth(data) {
        return http.post("/auth/check", data);
    }

    logOut(data) {
        return http.post("/auth/logout", data);
    }
}

export default new AuthDataService();
