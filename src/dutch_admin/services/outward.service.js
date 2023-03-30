import http from "../../http-common";

class OutwardsDataService {
    getAll(data) {
        return http.get(`/outwards/${data}`);
    }

    get(id) {
        return http.get(`/outwards/edit/${id}`);
    }

    create(data) {
        return http.post("/outwards/create", data);
    }

    update(id, data) {
        return http.put(`/outwards/${id}`, data);
    }

    delete(id) {
        return http.delete(`/outwards/${id}`);
    }

    deleteAll() {
        return http.delete(`/outwards`);
    }

    findByTitle(login_id) {
        return http.get(`/outwards?login_id=${login_id}`);
    }
}

export default new OutwardsDataService();
