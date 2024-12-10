import Furniture from '../models/Furniture.js';

function getAll(filter = {}) {
  return Furniture.find(filter);
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
