import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { validate } from 'express-validation';
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    minLength: [10, 'Email must be at least 10 characters'],
    unique: true,
    trim: true,
    validate: {
      validator: (value) => /@[A-Za-z0-9]+.[A-Za-z0-9]+$/.test(value),
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
});

userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
});

export default model('User', userSchema);
