import Volcano from '../models/Volcano.js';

function create(volcano) {
  Object.values(volcano).forEach((el) => {
    if (!el) {
      throw new Error('All fields are required!');
    }
  });

  return Volcano.create(volcano);
}
export default { create };
