import { Schema, model } from 'mongoose';

const furnitureSchema = Schema({
  make: String,
  model: String,
  year: Number,
  description: String,
  price: Number,
  img: String,
  material: String,
  _ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Furniture', furnitureSchema);
