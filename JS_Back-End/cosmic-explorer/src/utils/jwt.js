import jsonwebtoken from 'jsonwebtoken';
import { promisify } from 'util';

const verify = promisify(jsonwebtoken.verify);
const sign = (payload, secret, options) =>
  new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, secret, options, (err, token) => {
      if (err) reject(err);
      else resolve(token);
    });
  });

export default { verify, sign };
