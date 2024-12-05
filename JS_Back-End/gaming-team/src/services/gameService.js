import Game from '../models/Game.js';
import { validateGameOffer } from '../utils/validateGameOffer.js';
// Game model service
//Get all games
function getAll() {
  return Game.find();
}
//Get one game by id
function getById(gameId) {
  return Game.findById(gameId);
}
//Create new game
function create(data, owner) {
  validateGameOffer(data);
  if (!owner) {
    throw new Error('Unable to create an unauthenticated offer!');
  }
  return Game.create({ ...data, owner });
}
//Update one game by id
function updateById(gameId, data) {
  validateGameOffer(data);
  return Game.findByIdAndUpdate(gameId, data, { runValidators: true });
}
//Delete one game by id
function deleteById(gameId) {
  return Game.findByIdAndDelete(gameId);
}
//Get games by two criteria
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
//Push to the array a new buyer of the game
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
