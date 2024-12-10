import Furniture from '../models/Furniture.js';
import querystring from 'querystring';
function getAll(filter = {}) {
  const furniture = Furniture.find();
  if (filter.where) {
    const _ownerId = querystring.parse(filter.where)._ownerId.slice(1, -1);
    furniture.find({ _ownerId });
  }
  return furniture;
}
function getById(furnitureId) {
  return Furniture.findById(furnitureId);
}
function updateById(furnitureId, userInput) {
  validateInput(userInput);
  return Furniture.findByIdAndUpdate(furnitureId, userInput, { runValidators: true });
}
function deleteById(furnitureId) {
  return Furniture.findByIdAndDelete(furnitureId);
}

function create(userInput, _ownerId) {
  validateInput(userInput);
  return Furniture.create({ ...userInput, _ownerId });
}

function validateInput(userInput) {
  Object.entries(userInput).forEach(([k, v]) => {
    if (typeof v == 'string') {
      v = v.trim();
    }
    if (v == '' && k != 'material') {
      throw new Error('All fields are required!');
    }
  });
}
export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
};
