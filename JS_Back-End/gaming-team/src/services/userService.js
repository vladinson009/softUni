import User from '../models/User.js';
import bcrypt from 'bcrypt';
// User model service

//Register new user
async function register(email, username, password, repass) {
  if (!email.trim() || !username.trim() || !password.trim() || !repass.trim()) {
    throw new Error('All fields are required!');
  }
  if (username.length < 5) {
    throw new Error('The username should be at least five characters long.');
  }
  if (email.length < 10) {
    throw new Error('The email should be at least ten character long.');
  }
  if (password.length < 4) {
    throw new Error('The password should be at least four characters long.');
  }
  if (password.trim() != repass.trim()) {
    throw new Error('The password confirmation should be equal to the password.');
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
//Login existing user
async function login(email, password) {
  if (!email.trim() || !password.trim()) {
    throw new Error('All fields are required!');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password!');
    }
    return user;
  } catch (error) {
    throw error;
  }
}

export default { register, login };
