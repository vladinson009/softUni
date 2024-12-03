import jwt from '../libs/jwt.js';
import { JWT_SECRET } from '../constants.js';
export default function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' }); // set valid token for 2 hours
}
