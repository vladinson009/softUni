import { Schema, model, Types } from 'mongoose';

const gameSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
    enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'],
  },
  boughtBy: [
    {
      type: Types.ObjectId,
      ref: 'User',
    },
  ],
  owner: {
    type: Types.ObjectId,
    required: true,
  },
});
export default model('Game', gameSchema);
