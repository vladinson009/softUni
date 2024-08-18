window.addEventListener('load', onLoad);

async function getRecipes() {
  try {
    const response = await fetch(
      'http://localhost:3030/jsonstore/cookbook/recipes'
    );
    if (response.ok == false) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const recipes = await response.json();

    return Object.values(recipes);
  } catch (err) {
    throw err.message;
  }
}

async function getRecipeById(id) {
  const response = await fetch(
    'http://localhost:3030/jsonstore/cookbook/details/' + id
  );
  return await response.json();
}

function cardPreview(recipe) {
  const article = document.createElement('article');
  article.addEventListener('click', onClick);
  article.classList.add('preview');
  const preview = `
    <div class="title">
    <h2>${recipe.name}</h2>
    </div>
    <div class="small">
    <img src="${recipe.img}" />
    </div>`;

  article.innerHTML = preview;
  return article;

  async function onClick() {
    const fullArticle = document.createElement('article');
    fullArticle.addEventListener('click', () =>
      fullArticle.replaceWith(article)
    );
    const fullRecipe = await getRecipeById(recipe._id);
    const steps = fullRecipe.steps.map((s) => `<p>${s}</p>`);
    const ingredients = fullRecipe.ingredients.map((i) => `<li>${i}</li>`);
    const fullView = `
        <h2>${recipe.name}</h2>
        <div class="band">
          <div class="thumb">
            <img src="${fullRecipe.img}" />
          </div>
          <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
             ${ingredients.join('\n')}
            </ul>
          </div>
        </div>
        <div class="description">
          <h3>Preparation:</h3>
         ${steps.join('\n')}
        </div>`;
    fullArticle.innerHTML = fullView;

    article.replaceWith(fullArticle);
  }
}

async function onLoad() {
  const main = document.querySelector('main');
  const recipes = await getRecipes();
  const cards = recipes.map(cardPreview);
  main.innerHTML = '';
  cards.forEach((element) => {
    main.appendChild(element);
  });
}
