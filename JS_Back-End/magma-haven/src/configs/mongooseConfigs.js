import mongoose from 'mongoose';
import { DB } from '../constants.js';
import { errorParser } from '../utils/errorParser.js';
// setup for mongoose
export default async function mongooseConfig() {
  try {
    await mongoose.connect(DB, { dbName: 'magma-haven' });
    console.log('Successfully connected to DB!');
  } catch (error) {
    const err = errorParser(error);
    console.log('Cannot connect to DB!: ' + err);
  }
}
