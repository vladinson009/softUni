import { Schema, model } from 'mongoose';
import { urlValidator } from '../configs/modelUrlVerification.js';
const currentYear = new Date().getFullYear();
// Define the schema
const movieSchema = new Schema({
  title: { type: String, required: true, minLength: 1, default: undefined },
  genre: { type: String, required: true, minLength: 1 },
  director: { type: String, required: true, minLength: 1 },
  year: { type: Number, required: true, max: currentYear, min: 1950, minLength: 1 },
  rating: { type: Number, required: true, min: 1, max: 10, minLength: 1 },
  description: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: [100, 'Description cannot exceed 100 characters'],
  },
  imageUrl: {
    type: String,
    required: true,
    minLength: 1,
    validate: urlValidator(),
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
