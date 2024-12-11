import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from '../utils/jwt.js';
async function register(userInput) {
  Object.values(userInput).forEach((el) => {
    if (!el.trim()) {
      throw new Error('All fields are required!');
    }
  });
  if (userInput.password.trim() != userInput.rePass.trim()) {
    throw new Error('Password does not match!');
  }
  try {
    const user = await User.create(userInput);
    const token = await jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      'mysecret',
      { expiresIn: '2h' }
    );
    return token;
  } catch (error) {
    throw error;
  }
}

async function login(userInput) {
  Object.values(userInput).forEach((el) => {
    if (!el.trim()) {
      throw new Error('All fields are required!');
    }
  });
  try {
    const user = await User.findOne({ username: userInput.username });

    if (!user) {
      throw new Error('Invalid username or password!');
    }
    const isMatch = await bcrypt.compare(userInput.password, user.password);
    if (!isMatch) {
      throw new Error('Invalid username or password!');
    }
    const token = await jwt.sign(
      {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
      'mysecret',
      { expiresIn: '2h' }
    );
    return token;
  } catch (error) {
    throw error;
  }
}

export default { register, login };
