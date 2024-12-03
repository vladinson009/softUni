import User from '../models/User.js';
import bcrypt from 'bcrypt';
async function register(email, username, password, repass) {
  if (!email.trim() || !username.trim() || !password.trim() || !repass.trim()) {
    throw new Error('All fields are required!');
  }
  if (password.trim() != repass.trim()) {
    throw new Error('Passwords does not match!');
  }
  try {
    const user = await User.findOne({ $or: [{ email }, { username }] }).lean();
    if (user) {
      if (user.username == username) {
        throw new Error('Username already exist!');
      } else if (user.email == email) {
        throw new Error('Email already exist!');
      }
    }
  } catch (error) {
    throw error;
  }
  try {
    const hash = await bcrypt.hash(password, 11);
    return User.create({ email, username, password: hash });
  } catch (error) {
    throw error;
  }
}

export default { register };
