import mongoose from 'mongoose';
export default function mongooseConfig() {
  try {
    const data = mongoose.connect(process.env.DB_URL);
    console.log('connected to DB');
    return data;
  } catch (error) {
    console.log(error);
  }
}
