import { Schema, model } from 'mongoose';

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'User with this username already exist!'],
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'User with this email already exist!'],
  },
  password: {
    type: String,
    required: true,
  },
});
export default model('User', userSchema);
