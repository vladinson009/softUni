import { Schema, model } from 'mongoose';
import { urlValidator } from '../configs/modelUrlVerification.js';
const currentYear = new Date().getFullYear();
// Define the schema
const castSchema = new Schema({
  name: { type: String, required: [true, 'Name is required!'] },
  age: { type: Number, required: [true, 'aame is required!'], min: 18, max: 67 },
  born: { type: String, required: [true, 'Born is required!'] },
  imageUrl: {
    type: String,
    required: [true, 'Image is required!'],
    validate: urlValidator(),
  },
  movie: [
    {
      _id: false,
      movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    },
  ],
});

export default model('Cast', castSchema);
