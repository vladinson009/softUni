import { Schema, model } from 'mongoose';
import { urlValidator } from '../configs/modelUrlVerification.js';
const currentYear = new Date().getFullYear();
// Define the schema
const movieSchema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  director: { type: String, required: true },
  year: { type: Number, required: true, max: currentYear, min: 1950 },
  rating: { type: Number, required: true, min: 1, max: 10 },
  description: {
    type: String,
    required: true,
    maxLength: [100, 'Description cannot exceed 100 characters'],
  },
  imageURL: {
    type: String,
    required: true,
    validate: urlValidator(),
  },
  cast: [
    {
      _id: false,
      nameInMovie: String,
      cast: {
        type: Schema.Types.ObjectId,
        ref: 'Cast',
      },
    },
  ],
});

export default model('Movie', movieSchema);
