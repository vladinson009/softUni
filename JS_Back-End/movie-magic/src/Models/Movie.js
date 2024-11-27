import { Schema, model } from 'mongoose';
import { urlValidator, inputValidation } from '../configs/modelVerification.js';
const currentYear = new Date().getFullYear();

// Define the schema
const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [5, 'title must be at least 5 characters!'],
    default: undefined,
    validate: inputValidation,
  },
  genre: {
    type: String,
    required: true,
    minLength: [5, 'genre must be at least 5 characters!'],
    validate: inputValidation,
  },
  director: {
    type: String,
    required: true,
    minLength: [5, 'director must be at least 5 characters!'],
    validate: inputValidation,
  },
  year: {
    type: Number,
    required: true,
    max: [currentYear, `Maximum year is ${currentYear}`],
    min: [1950, 'Year must be at least 1950!'],
    minLength: [4, 'year must be at least 4 characters!'],
  },
  rating: {
    type: Number,
    required: true,
    min: [1, 'minimum rating must be 1!'],
    max: [5, 'maximum rating must be 5!'],
    minLength: [1, 'rating must be a digit!'],
  },
  description: {
    type: String,
    required: true,
    minLength: [20, 'Description must be at least 20 characters!'],
    maxLength: [100, 'Description cannot exceed 100 characters!'],
  },
  imageUrl: {
    type: String,
    required: true,
    minLength: [1, 'Image is required!'],
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
      nameInMovie: {
        type: String,
        required: [true, 'Name in movie is required!'],
        minLength: [5, 'Name in movie must be at least 5 characters!'],
      },
      cast: {
        type: Schema.Types.ObjectId,
        ref: 'Cast',
      },
    },
  ],
});

export default model('Movie', movieSchema);
