import { JWT_SIGNATURE } from '../constants.js';
import jsonwebtoken from 'jsonwebtoken';

export function createToken(user, res) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };
  const token = jsonwebtoken.sign(payload, JWT_SIGNATURE, { expiresIn: '2h' });
  res.cookie('auth', token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
}
