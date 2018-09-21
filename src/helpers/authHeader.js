export function authHeader() {
  let token = localStorage.getItem('token');
  let userId = localStorage.getItem('userId');

  if (userId && token) {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'JWT ' + token
    };
  } else {
    return {};
  }
}
