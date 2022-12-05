import http from "../http-common";

class BookService {
  getAll(token) {
    const config = {
      headers: { "x-access-token": token },
      "Content-type": "application/json",
    };    
    return http.get("/books", config);
  }

  getNew(token) {
    const config = {
      headers: { "x-access-token": token },
      "Content-type": "application/json",
    };    
    return http.get("/books?new=1", config);
  }

  getOld(token) {
    const config = {
      headers: { "x-access-token": token },
      "Content-type": "application/json",
    };    
    return http.get("/books?old=1", config);
  }

  get(id, token) {
    const config = {
      headers: { "x-access-token": token },
      "Content-type": "application/json",
    };    
    return http.get(`/books/${id}`, config);
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

  delete(id, token) {
    const config = {
      headers: { "x-access-token": token },
      "Content-type": "application/json",
    };    
    return http.post('/books/delete', { bookId: id }, config);
  }

  deleteAll() {
    return http.delete(`/books`);
  }

  findByTitle(title) {
    return http.get(`/books?title=${title}`);
  }
}

export default new BookService();