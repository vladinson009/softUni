import User from '../models/User.js';
import bcrypt from 'bcrypt';

async function register(username, email, password, repass) {
  if (!username || !email || !password || !repass) {
    throw new Error('All fields are required!');
  }
  if (password != repass) {
    throw new Error('Passwords does not match!');
  }
  try {
    const hash = await bcrypt.hash(password, 11);
    return User.create({ username, email, password: hash });
  } catch (error) {
    throw error;
  }
}
async function login(username, password) {
  if (!username || !password) {
    throw new Error('All fields are required!');
  }
  const user = await User.findOne({ username });
  if (user == null) {
    throw new Error('Invalid username or password!');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid username or password!');
  }
  return user;
}

export default { login, register };
