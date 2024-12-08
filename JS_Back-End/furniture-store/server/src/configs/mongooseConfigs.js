import mongoose from 'mongoose';

export default async function () {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/', { dbName: 'furniture-store' });
    console.log('Connected to DB');
  } catch (error) {
    console.log(error);
    throw error;
  }
}
