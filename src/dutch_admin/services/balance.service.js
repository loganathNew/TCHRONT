import http from "../../http-common";

class BalanceDataService {
  getAll(data) {
    return http.get(`/balances/${data}`);
  }

  get(id) {
    return http.get(`/balances/edit/${id}`);
  }

  create(data) {
    return http.post("/balances/create", data);
  }

  update(id, data) {
    return http.put(`/balances/${id}`, data);
  }

  delete(id) {
    return http.delete(`/balances/${id}`);
  }

  deleteAll() {
    return http.delete(`/balances`);
  }

  findByTitle(login_id) {
    return http.get(`/balances?login_id=${login_id}`);
  }
}

export default new BalanceDataService();
