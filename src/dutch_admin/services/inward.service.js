import http from "../../http-common";

class InwardsDataService {
  getAll(data) {
    return http.get(`/inwards/${data}`);
  }

  get(id) {
    return http.get(`/inwards/edit/${id}`);
  }

  create(data) {
    return http.post("/inwards/create", data);
  }

  update(id, data) {
    return http.put(`/inwards/${id}`, data);
  }

  delete(id) {
    return http.delete(`/inwards/${id}`);
  }

  deleteAll() {
    return http.delete(`/inwards`);
  }

  findByTitle(login_id) {
    return http.get(`/inwards?login_id=${login_id}`);
  }
}

export default new InwardsDataService();
