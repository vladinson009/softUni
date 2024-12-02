import { Schema, model } from 'mongoose';

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: [true, 'User with this username already exist!'],
    minLength: [2, 'Username should be at least 2 characters long!'],
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'User with this email already exist!'],
    minLength: [10, 'Email should be at least 10 characters long!'],
  },
  password: {
    type: String,
    required: true,
    minLength: [4, 'Password should be at least 4 characters long!'],
  },
});
export default model('User', userSchema);
