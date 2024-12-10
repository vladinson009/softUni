import Furniture from '../models/Furniture.js';

function getAll(filter = {}) {
  return Furniture.find(filter);
}

export default { getAll };
