import { Schema, model } from 'mongoose';
import { urlValidator, inputValidation } from '../util/modelVerification.js';
// Define the schema
const castSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required!'],
    minLength: [5, 'Name must be at least 5 characters!'],
    validate: inputValidation,
  },
  age: {
    type: Number,
    required: [true, 'Age is required!'],
    min: [1, 'Minimum age is 1'],
    max: [120, 'Maximum age is 120'],
  },
  born: {
    type: String,
    required: [true, 'Born is required!'],
    minLength: [10, 'Born must be at least 10 characters!'],
    validate: inputValidation,
  },
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
