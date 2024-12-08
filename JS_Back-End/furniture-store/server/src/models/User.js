import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = Schema({
  email: String,
  password: String,
});
userSchema.pre('save', async function () {
  try {
    const hash = await bcrypt.hash(this.password, 11);
    this.password = hash;
  } catch (error) {
    throw error;
  }
});

export default model('User', userSchema);
