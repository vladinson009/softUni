import jsonwebtoken from 'jsonwebtoken';
import { promisify } from 'util';
//Promisify json web token to use it with promises(async/await)
const sign = promisify(jsonwebtoken.sign);
const verify = promisify(jsonwebtoken.verify);
export default { sign, verify };
