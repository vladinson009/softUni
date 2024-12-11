import Planets from '../models/Planets.js';

function create(userInput, owner) {
  Object.values(userInput).forEach((el) => {
    if (!el.trim()) {
      throw new Error('All fields are required!');
    }
  });
  return Planets.create({ ...userInput, owner });
}
function getAll() {
  return Planets.find();
}
function getById(planetId) {
  return Planets.findById(planetId);
}
function updateById(planetId, userInput) {
  return Planets.findByIdAndUpdate(planetId, userInput, { runValidators: true });
}
function addLike(planetId, userId) {
  return Planets.findByIdAndUpdate(planetId, {
    $addToSet: { likedList: userId },
  });
}
function deleteById(planetId) {
  return Planets.findByIdAndDelete(planetId);
}
function filter(filters) {
  const query = Planets.find();
  if (filters.name) {
    query.find({
      name: {
        $regex: filters.name.trim(),
        $options: 'i',
      },
    });
  }
  if (filters.solarSystem) {
    query.find({
      solarSystem: {
        $regex: filters.solarSystem.trim(),
        $options: 'i',
      },
    });
  }
  return query;
}
export default {
  create,
  getAll,
  getById,
  addLike,
  deleteById,
  updateById,
  filter,
};
