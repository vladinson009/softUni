import jsonwebtoken from 'jsonwebtoken';
import { promisify } from 'util';

const sign = promisify(jsonwebtoken.sign);
const verify = promisify(jsonwebtoken.verify);
export default { sign, verify };
