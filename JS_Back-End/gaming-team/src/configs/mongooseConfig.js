import mongoose from 'mongoose';
import { DB } from '../constants.js';
// connecting mongoDB through mongoose
export default async function mongooseConfig() {
  return mongoose.connect(DB, { dbName: 'gaming-team' });
}
