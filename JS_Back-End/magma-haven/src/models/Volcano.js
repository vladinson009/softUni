import { Schema, model, Types } from 'mongoose';

const volcanoSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  elevation: {
    type: Number,
    required: true,
  },
  lastEruption: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  typeVolcano: {
    type: String,
    required: true,
    enum: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
  },
  description: {
    type: String,
    required: true,
  },
  voteList: [
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

export default model('Volcano', volcanoSchema);
