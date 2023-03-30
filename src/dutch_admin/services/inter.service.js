import http from "../../http-common";

class InwardsDataService {
  getAll(data) {
    return http.get(`/inters/${data}`);
  }

  get(id) {
    return http.get(`/inters/edit/${id}`);
  }

  create(data) {
    return http.post("/inters/create", data);
  }

  update(id, data) {
    return http.put(`/inters/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inters/${id}`);
  }

  deleteAll() {
    return http.delete(`/inters`);
  }

  findByTitle(login_id) {
    return http.get(`/inters?login_id=${login_id}`);
  }
}

export default new InwardsDataService();
