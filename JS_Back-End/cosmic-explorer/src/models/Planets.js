import { Schema, model } from 'mongoose';

const planetsSchema = Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, 'The Name should be at least 2 characters!'],
  },
  age: {
    type: Number,
    required: true,
    min: [0, 'The Age should be a positive number!'],
  },
  solarSystem: {
    type: String,
    required: true,
    minLength: [2, 'The Solar System should be at least 2 characters'],
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ['Inner', 'Outer', 'Dwarf'],
      message: '{VALUE} is not a valid type! Use "Inner", "Outer", "Dwarf"!',
    },
  },
  moons: {
    type: Number,
    required: true,
    min: [0, 'The Moons should be a positive number!'],
  },
  size: {
    type: Number,
    required: true,
    min: [0, 'The Size should be a positive number!'],
  },
  rings: {
    type: String,
    required: true,
    enum: {
      values: ['Yes', 'No'],
      message: '{VALUE} is not a valid type! Use "Yes" or "No"',
    },
  },
  description: {
    type: String,
    required: true,
    minLength: [10, 'Description should be more than 10 characters!'],
    maxLength: [100, 'Description should be less than 100 characters!'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function (url) {
        return /^http[s]?:\/\//.test(url);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  likedList: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Planets', planetsSchema);
