const addMovieView = document.getElementById('add-movie');
addMovieView.remove();

export function onAddMovie(e) {
  e.preventDefault();
  const main = document.getElementById('main');
  main.replaceChildren(addMovieView);
}
