import { log } from 'console';
import Furniture from '../models/Furniture.js';
import querystring from 'querystring';
function getAll(qs = {}) {
  const query = Furniture.find();
  if (qs.where) {
    const _ownerId = querystring.parse(qs.where)._ownerId.slice(1, -1);
    query.find({ _ownerId });
  }
  return query;
}
function getById(furnitureId) {
  return Furniture.findById(furnitureId);
}
function create(data, _ownerId) {
  const isEmptyFields = Object.entries(data)
    .filter((k, v) => k != 'material')
    .some(([k, v]) => v == '');
  if (isEmptyFields) {
    throw new Error('Fill up all mandatory fields');
  }

  return Furniture.create({ ...data, _ownerId });
}

export default {
  create,
  getAll,
  getById,
};
