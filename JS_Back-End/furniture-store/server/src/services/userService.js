import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
async function register(userInput) {
  Object.values(userInput).forEach((el) => {
    if (el.trim() == '') {
      throw new Error('All fields are required!');
    }
  });
  if (userInput.password.trim() != userInput.rePass.trim()) {
    throw new Error('Password does not match!');
  }
  try {
    const isUser = await User.countDocuments({ email: userInput.email });
    if (isUser > 0) {
      throw new Error('Email aready exists!');
    }
  } catch (error) {
    throw error;
  }

  const payload = {
    email: userInput.email,
    password: userInput.password,
  };
  const user = await User.create(payload);
  return createToken(user);
}
async function login(userInput) {
  const { email, password } = userInput;
  if (!email.trim() || !password.trim()) {
    throw new Error('All fields are required!');
  }
  try {
    const user = await User.findOne({ email });
    if (user == null) {
      throw new Error('Invalid email or password!');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch == false) {
      throw new Error('Invalid email or password!');
    }
    return createToken(user);
  } catch (error) {
    throw error;
  }
}

function createToken(user) {
  const payload = {
    email: user.email,
    _id: user._id,
  };

  const accessToken = jwt.sign(payload, 'secret', { expiresIn: '2h' });
  payload.accessToken = accessToken;
  return payload;
}
export default { register, login };
// sessionStorage.setItem('email', result.email);
// sessionStorage.setItem('authToken', result.accessToken);
// sessionStorage.setItem('userId', result._id);
