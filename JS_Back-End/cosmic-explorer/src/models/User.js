import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = Schema({
  username: {
    type: String,
    required: true,
    minLength: [2, 'Username should be at least 2 characters!'],
    maxLength: [20, 'Username should be less than 20 characters!'],
  },
  email: {
    type: String,
    required: true,
    minLength: [10, 'Email should be at least 10 characters!'],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, 'Password should be at least 4 characters!'],
  },
});
userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
});
export default model('User', userSchema);
