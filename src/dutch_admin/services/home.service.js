import http from "../../http-common";

class HomeDataService {
    getAll(filter) {
        return http.get(`/dashboard/${filter}`);
    }

    getSelectDatas(id) {
        return http.get(`/getSelectDatas/${id}`);
    }

    getLogFiles() {
        return http.get(`/getLogfiles`);
    }

}

export default new HomeDataService();
