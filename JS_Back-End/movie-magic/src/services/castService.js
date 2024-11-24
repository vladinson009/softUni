import Cast from '../models/Cast.js';

export function createCast(data) {
  return Cast.create(data);
}
export function getCastWithout(casts = []) {
  const castIds = casts.map((cast) => cast.cast._id);
  return Cast.find({ _id: { $nin: castIds } });
  //.nin('_id', castIds);
}
