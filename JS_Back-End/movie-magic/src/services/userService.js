import User from '../models/User.js';

export async function login(email, password) {}

export async function register(email, password) {
  return User.create({ email, password });
}
