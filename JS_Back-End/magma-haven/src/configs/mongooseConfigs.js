import mongoose from 'mongoose';
import { DB } from '../constants.js';

export default async function mongooseConfig() {
  try {
    return await mongoose.connect(DB);
  } catch (error) {
    console.log(error);
  }
}
