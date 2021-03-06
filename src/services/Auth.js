class Auth {
  static authenticateUser(token, id) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', id);
  }

  static isUserAuthenticated(id) {
    return localStorage.getItem('token') !== null && id === this.getId();
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static getId() {
    return localStorage.getItem('userId');
  }
}

export default Auth;
