import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
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
    validate: {
      validator: (value) => /[A-Za-z0-9 ]+/.test(value),
      message: 'The password contains not allowed characters!',
    },
  },
});
userSchema.virtual('repass').set(function (value) {
  if (this.password != value) {
    throw new Error("Password don't match!");
  }
});
userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 11);
  this.password = hash;
});

export default model('User', userSchema);
