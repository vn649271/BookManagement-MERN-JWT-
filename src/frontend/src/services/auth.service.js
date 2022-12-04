import http from "../http-common";

class AuthService {
  salt() {
    return http.get(`/auth/salt`);
  }
  signin(username, password) {
    return http.post(`/auth/signin/${username}/${password}`);
  }
}

export default new AuthService();