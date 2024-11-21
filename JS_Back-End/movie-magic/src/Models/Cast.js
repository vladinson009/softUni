import { Schema, model } from 'mongoose';
import { urlValidator } from '../configs/modelConfigs.js';
const currentYear = new Date().getFullYear();
// Define the schema
const castSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 67 },
  born: { type: String, required: true },
  imageURL: {
    type: String,
    required: true,
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
