import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
export async function login(email, password) {
  try {
    const user = await User.findOne({ email });
    const isValid = await bcrypt.compare(password, user.password);

    if (!user || !isValid) {
      throw new Error('Email or password does not match!');
    }

    const payload = {
      _id: user._id,
      email,
    };

    const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '2h' });

    return token;
  } catch (error) {
    throw error;
  }
}

export async function register(email, password, repass) {
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
    if (email.length < 10) {
      throw new Error('Email must be at least 6 characters!');
    }
    const isExist = await User.countDocuments({ email });
    if (isExist > 0) {
      throw new Error('Email already exist!');
    }

    return User.create({ email, password });
  } catch (error) {
    throw error;
  }
}
