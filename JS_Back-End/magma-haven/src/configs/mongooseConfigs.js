import mongoose from 'mongoose';
import { DB } from '../constants.js';

export default async function mongooseConfig() {
  try {
    await mongoose.connect(DB, { dbName: 'magma-haven' });
    console.log('Successfully connected to DB!');
  } catch (error) {
    console.log('Cannot connect to DB!' + error.message);
  }
}
