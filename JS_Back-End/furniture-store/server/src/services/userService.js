import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
async function register(email, password, rePass) {
  if (!email.trim() || !password.trim()) {
    throw new Error('All fields are required!');
  }
  if (password.trim() != rePass.trim()) {
    throw new Error('Passwords does not match!');
  }
  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error('User already exist');
    }

    const createdUser = await User.create({ email, password });
    return generateSession(createdUser);
  } catch (error) {
    throw error.message;
  }
}
async function login(email, password) {
  if (!email.trim() || !password.trim()) {
    throw new Error('All fields are required!');
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }
    return generateSession(user);
  } catch (error) {
    throw error.message;
  }
}
function logout() {}

function generateSession(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, 'secret', { expiresIn: '2h' });

  return {
    _id: user._id,
    email: user.email,
    accessToken: token,
  };
}

export default { register, login, logout };
