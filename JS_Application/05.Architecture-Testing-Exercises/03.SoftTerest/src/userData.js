export function userData(method = 'get', data) {
  if (method == 'set') {
    localStorage.setItem('userData', JSON.stringify(data));
    return data;
  } else if (method == 'get') {
    return JSON.parse(localStorage.getItem('userData')) ?? false;
  } else if (method == 'delete') {
    localStorage.removeItem('userData');
  }
}
