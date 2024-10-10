import { userData } from '/util.js';

const host = 'http://localhost:3030';
const endpoints = {
  login: '/users/login',
  logout: '/users/logout',
  register: '/users/register',
  createTeam: '/data/teams',
  editTeam: '/data/teams/',
  getAllTeams: '/data/teams',
  getTeamById: '/data/teams/',
  getAllMembers: '/data/members?where=status%3D%22member%22',
  partyMembers: (id) =>
    `/data/members?where=${encodeURIComponent(`teamId IN (${id}) AND status="member"`)}`,
  membersInTeam: (teamId) =>
    `/data/members?where=teamId%3D%22${teamId}%22&load=user%3D_ownerId%3Ausers`,
  becomeMember: '/data/members',
  approveMember: '/data/members/',
  removeMember: '/data/members/',
};

async function request(url, options) {
  try {
    const response = await fetch(host + url, options);

    if (response.ok != true) {
      if (response.status == 403) {
        userData('remove');
      }
      const error = await response.json();
      throw new Error(error.message);
    }
    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (error) {
    throw error;
  }
}

function createOptions(method, data) {
  const localStorage = userData('get');
  const options = {
    method,
    headers: {},
  };
  if (localStorage) {
    options.headers['X-Authorization'] = localStorage.token;
  }
  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }
  return options;
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
export async function register(email, password) {
  return post(endpoints.register, { email, password });
}
export async function login(email, password) {
  return post(endpoints.login, { email, password });
}
export async function logout() {
  get(endpoints.logout);
  userData('remove');
}
// TEAMS REQUEST
export async function getAllTeams() {
  return get(endpoints.getAllTeams);
}
export async function getTeamById(id) {
  return get(endpoints.getTeamById + id);
}
export async function createTeam(name, logoUrl, description) {
  return post(endpoints.createTeam, { name, logoUrl, description });
}
export async function editTeam(id, name, logoUrl, description) {
  return put(endpoints.editTeam + id, { name, logoUrl, description });
}
//MEMBERS REQUEST
export async function getAllMembers() {
  return get(endpoints.getAllMembers);
}
export async function getMembersInTeam(teamId) {
  return get(endpoints.membersInTeam(teamId));
}

export async function getPartyMembers(teamId) {
  return get(endpoints.partyMembers(decoratedId(teamId)));
}
export async function becomeMember(teamId) {
  return post(endpoints.becomeMember, { teamId });
}
export async function approveMember(id) {
  return put(endpoints.approveMember + id, { status: 'member' });
}
export async function removeMember(id) {
  return del(endpoints.removeMember + id);
}
function decoratedId(id) {
  return [...id].map((el) => `"${el}"`);
}
