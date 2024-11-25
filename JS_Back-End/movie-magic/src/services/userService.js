import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export async function login(email, password) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('User does not exist!');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Password does not match');
  }

  const payload = {
    _id: user._id,
    email,
  };

  const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });

  return token;
}

export function register(email, password, repass) {
  try {
    if (!email || !password) {
      throw new Error('All fields are required!');
    }
    if (password != repass) {
      throw new Error('Passwords does not match!');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters!');
    }
    return User.create({ email, password });
  } catch (error) {
    throw error;
  }
}