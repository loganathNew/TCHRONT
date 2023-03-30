import http from "../../http-common";

//master = items, locations, storage_locations, suppliers, qc_names

class MastersDataService {
    getAll(master) {
        return http.get(`/masters/${master}`);
    }

    get(id, master) {
        return http.get(`/masters/${master}/${id}`);
    }

    create(data, master) {
        return http.post(`/masters/create/${master}`, data);
    }

    update(id, data, master) {
        return http.put(`/masters/${master}/${id}`, data);
    }

    delete(id, master) {
        return http.delete(`/masters/${master}/${id}`);
    }

    deleteAll(master) {
        return http.delete(`/masters/${master}`);
    }

    findByTitle(title, master) {
        return http.get(`/masters/${master}?title=${title}`);
    }
}

export default new MastersDataService();
