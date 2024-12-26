import fetchApi from './fetchApi';

export function getRecipes() {
  return fetchApi.get('/data/recipes?&sortBy=_createdOn%20desc');
}
export function getRecipeById(recipeId) {
  return fetchApi.get('/data/recipes/' + recipeId);
}
export function getLastThree() {
  return fetchApi.get('/data/recipes/?pageSize=3&sortBy=_createdOn%20desc');
}
export function getOwnRecipes(ownerId) {
  return fetchApi.get(`/data/recipes/?where=_ownerId%3D%22${ownerId}%22`);
}
export function getFiltered(filter) {
  return fetchApi.get(
    `/data/recipes/?where=name%20LIKE%20%22${filter}%22&sortBy=_createdOn%20desc`
  );
}
export function createRecipe(data) {
  return fetchApi.post('/data/recipes', data);
}
export function editRecipe(recipeId, data) {
  return fetchApi.put('/data/recipes/' + recipeId, data);
}
export function deleteRecipeById(recipeId) {
  return fetchApi.del('/data/recipes/' + recipeId);
}
export function likeRecipe(recipeId) {
  return fetchApi.post(`/data/likes/`, { recipeId });
}
export function getLikes(recipeId) {
  return fetchApi.get(`/data/likes?where=recipeId%3D%22${recipeId}%22&distinct=_ownerId`);
}
