import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { errorParser } from '../utils/errorParser.js';

async function register(username, email, password, repass) {
  if (!username || !email || !password || !repass) {
    throw new Error('All fields are required!');
  }
  if (password != repass) {
    throw new Error('Passwords does not match!');
  }
  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      throw new Error('User with this username or password already exist!');
    }
  } catch (error) {
    const err = errorParser(error);
    throw err;
  }
  try {
    const hash = await bcrypt.hash(password, 11);
    return User.create({ username, email, password: hash });
  } catch (error) {
    const err = errorParser(error);
    throw err;
  }
}
async function login(email, password) {
  if (!email || !password) {
    throw new Error('All fields are required!');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid username or password!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password!');
    }
    return user;
  } catch (error) {
    throw new Error('Invalid username or password!');
  }
}
export default { login, register };
