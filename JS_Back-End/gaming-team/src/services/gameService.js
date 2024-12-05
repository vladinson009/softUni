import Game from '../models/Game.js';
const platforms = ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'];

function create(data, owner) {
  if (platforms.indexOf(data.platform) < 0) {
    throw new Error('Please select a valid platform!');
  }
  Object.entries(data).forEach(([key, value]) => {
    if (!value.trim()) {
      throw new Error(`${key} field is required!`);
    }
  });
  if (!owner) {
    throw new Error('Unable to create an unauthenticated offer!');
  }
  return Game.create({ ...data, owner });
}
function getAll() {
  return Game.find();
}
function getById(gameId) {
  return Game.findById(gameId);
}
function updateById(gameId, data) {
  Object.entries(data).forEach(([key, value]) => {
    if (!value.trim()) {
      throw new Error(`${key} field is required!`);
    }
  });
  return Game.findByIdAndUpdate(gameId, data, { runValidators: true });
}
function deleteById(gameId) {
  return Game.findByIdAndDelete(gameId);
}
function searchCriteria(nameValue, platformValue) {
  return Game.find({
    name: {
      $regex: nameValue.trim(),
      $options: 'i',
    },
    platform: {
      $regex: platformValue.trim(),
      $options: 'i',
    },
  });
}
function boughtBy(gameId, boughtBy) {
  if (!boughtBy) {
    throw new Error('User is not authenticated!');
  }
  return Game.findByIdAndUpdate(gameId, { $addToSet: { boughtBy } }, { runValidators: true });
}
export default {
  create,
  getAll,
  getById,
  updateById,
  deleteById,
  searchCriteria,
  boughtBy,
};
