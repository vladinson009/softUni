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
function getOne(volcanoId) {
  return Volcano.findById(volcanoId);
}
export default { create, getAll, getOne };
