import Volcano from '../models/Volcano.js';

function create(volcano, owner) {
  Object.values(volcano).forEach((el) => {
    if (!el) {
      throw new Error('All fields are required!');
    }
  });

  return Volcano.create({ ...volcano, owner });
}
function getAll() {
  return Volcano.find();
}
function getById(volcanoId) {
  return Volcano.findById(volcanoId);
}
function updateById(volcanoId, data) {
  if (!volcanoId) {
    throw new Error('Could not find the volcano in our database...');
  }
  Object.values(data).forEach((field) => {
    if (!field) {
      throw new Error('All fields are required!');
    }
  });
  return Volcano.findByIdAndUpdate(volcanoId, data, { runValidators: true });
}
function deleteById(volcanoId) {
  return Volcano.findByIdAndDelete(volcanoId);
}
function voteById(volcanoId, userId) {
  return Volcano.findByIdAndUpdate(volcanoId, {
    $addToSet: { voteList: userId },
  });
}
export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  voteById,
};
