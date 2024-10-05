import { userData as uData, userData } from './util.js';
const host = 'http://localhost:3030';
const endpoints = {
  registerUser: '/users/register',
  loginUser: '/users/login',
  logoutUser: '/users/logout',
  fullCatalog: '/data/catalog',
  getById: '/data/catalog/',
  createFurniture: '/data/catalog',
  updateFurniture: '/data/catalog/',
  deleteFurniture: '/data/catalog/',
  getMyFurniture: (userId) => `/data/catalog?where=_ownerId%3D%22${userId}%22`,
};
//MAKE REQUIEST AND CREATE OPTIONS
function createOptions(method, data) {
  const options = {
    method,
    headers: {},
  };
  if (data != undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  const userData = uData();
  if (userData) {
    options.headers['X-Authorization'] = userData.token;
  }
  return options;
}
async function request(url, options) {
  try {
    const response = await fetch(host + url, options);
    if (response.ok != true) {
      if (response.status == 403) {
        userData('remove');
      }
      const err = await response.json();
      throw new Error(err.message);
    }
    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
}
// CRUD OPERATIONS
async function get(url) {
  return request(url, createOptions());
}
async function post(url, data) {
  return request(url, createOptions('post', data));
}
async function put(url, data) {
  return request(url, createOptions('put', data));
}
async function del(url) {
  return request(url, createOptions('delete'));
}
//USER INTERACTIONS
export async function register(email, password) {
  const data = await post(endpoints.registerUser, { email, password });
  userData('set', data);
}
export async function login(email, password) {
  const data = await post(endpoints.loginUser, { email, password });
  userData('set', data);
}
export async function logout() {
  get(endpoints.logoutUser);
  userData('remove');
}
//DATABASE INTERACTIONS
export async function getAllItems() {
  return get(endpoints.fullCatalog);
}
export async function getById(id) {
  return get(endpoints.getById + id);
}
export async function createFurniture(dataObject) {
  post(endpoints.createFurniture, dataObject);
}
export async function updateFurniture(id, dataObject) {
  put(endpoints.updateFurniture + id, dataObject);
}
export async function deleteFurniture(id) {
  del(endpoints.deleteFurniture + id);
}
export async function getMyFurniture(userId) {
  return get(endpoints.getMyFurniture(userId));
}
