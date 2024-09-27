export function userData(method = 'get', data) {
  if (method == 'set') {
    const userData = {
      email: data.email,
      id: data._id,
      token: data.accessToken,
    };
    return localStorage.setItem('userData', JSON.stringify(userData));
  } else if (method == 'get') {
    return JSON.parse(localStorage.getItem('userData')) ?? false;
  } else if (method == 'delete') {
    localStorage.removeItem('userData');
  }
}
