import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required!'],
    unique: true,
    trim: true,
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
