import http from "../http-common";

class BookManagementService {
  getAll(token) {
    const config = {
      headers: { "x-access-token": token },
      "Content-type": "application/json",
    };    
    return http.get("/books", config);
  }

  get(id) {
    return http.get(`/books/${id}`);
  }

  create(data) {
    const config = {
      headers: { "x-access-token": data.token },
      "Content-type": "application/json",
    };    
    return http.post("/books", data, config);
  }

  update(id, data) {
    return http.put(`/books/${id}`, data);
  }

  delete(id) {
    return http.delete(`/books/${id}`);
  }

  deleteAll() {
    return http.delete(`/books`);
  }

  findByTitle(title) {
    return http.get(`/books?title=${title}`);
  }
}

export default new BookManagementService();