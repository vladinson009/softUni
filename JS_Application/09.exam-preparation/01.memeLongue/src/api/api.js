import { getUserData, removeUserData } from '../util.js';
import { modal } from '../views/notify.js';

const host = 'http://localhost:3030';
//CRUD PREPARATION:
function createOptions(method, data) {
  const userData = getUserData();
  const options = {
    method,
    headers: {},
  };
  if (data != undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  if (userData != null) {
    options.headers['X-Authorization'] = userData.token;
  }
  return options;
}
async function request(url, options) {
  try {
    const response = await fetch(host + url, options);
    if (response.ok != true) {
      if (response.status === 403) {
        removeUserData();
      }
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status === 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    throw modal(error);
  }
}
//CRUD OPERATIONS:
export async function get(url) {
  return request(url, createOptions('get'));
}
export async function post(url, data) {
  return request(url, createOptions('post', data));
}
export async function put(url, data) {
  return request(url, createOptions('put', data));
}
export async function del(url) {
  return request(url, createOptions('delete'));
}
//USER INTERRACTION:
export async function login(email, password) {
  return post('/users/login', { email, password });
}
export async function register(username, email, password, gender) {
  return post('/users/register', { username, email, password, gender });
}
export async function logout() {
  return get('/users/logout');
}
