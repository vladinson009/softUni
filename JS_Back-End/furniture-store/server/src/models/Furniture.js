import { Schema, model } from 'mongoose';

const furnitureSchema = Schema({
  make: { type: String, minLength: 4 },
  model: { type: String, minLength: 4 },
  year: { type: Number, min: 1950, max: 2050 },
  description: { type: String, minLength: 10 },
  price: { type: Number, min: 0 },
  img: { type: String, required: true },
  material: String,
  _ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('Furniture', furnitureSchema);
