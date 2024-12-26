const endpoint = 'http://localhost:3030';
function isToken() {
  return JSON.parse(localStorage.getItem('auth')) || null;
}
async function api(url, options) {
  const response = await fetch(endpoint + url, options);
  if (response.ok == false) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }
  if (response.status == 204) {
    return response;
  }
  return await response.json();
}

function createOptions(method, data) {
  const token = isToken();
  const result = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (data) {
    result.body = JSON.stringify(data);
  }
  if (token) {
    result.headers['X-Authorization'] = token.token;
  }
  return result;
}

function get(url) {
  return api(url);
}
function post(url, data) {
  return api(url, createOptions('POST', data));
}
function put(url, data) {
  return api(url, createOptions('PUT', data));
}
function del(url) {
  return api(url, createOptions('DELETE'));
}

export default { get, post, put, del };
