import { create } from './create.js';
import { edit } from './edit.js';
import { login } from './login.js';
import { register } from './register.js';
const main = document.querySelector('main');
const nav = document.querySelector('nav');
nav.addEventListener('click', onNav);

onLoadRecipes();

function onNav(ev) {
  ev.preventDefault();
  const content = ev.target.textContent;
  const options = {
    Login: renderLogin,
    Register: renderRegister,
    Catalog: onLoadRecipes,
    'Create Recipe': renderCreate,
  };
  const func = options[content];
  if (typeof func == 'function') {
    func();
    document.querySelectorAll('a').forEach((e) => e.classList.remove('active'));
    ev.target.classList.add('active');
  }
}
function renderCreate() {
  const article = document.createElement('article');
  article.innerHTML = `<h2>New Recipe</h2>
            <form id="createForm">
                <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines"></textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines"></textarea></label>
                <input type="submit" value="Create Recipe">
            </form>`;
  main.replaceChildren(article);
  const createForm = document.getElementById('createForm');
  create(createForm);
}

function renderLogin() {
  const article = document.createElement('article');
  article.innerHTML = `<h2>Login</h2>
            <form id="loginForm">
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <input type="submit" value="Login">
            </form>`;
  main.replaceChildren(article);
  const loginForm = document.getElementById('loginForm');
  login(loginForm);
}
function renderRegister() {
  const article = document.createElement('article');
  article.innerHTML = `<h2>Register</h2>
            <form id="loginForm">
                <label>E-mail: <input type="text" name="email"></label>
                <label>Password: <input type="password" name="password"></label>
                <label>Repeat: <input type="password" name="rePass"></label>
                <input type="submit" value="Register">
            </form>`;
  main.replaceChildren(article);
  const registerForm = document.getElementById('loginForm');
  register(registerForm);
}

async function getRecipes() {
  const response = await fetch('http://localhost:3030/data/recipes');
  const recipes = await response.json();

  return recipes;
}

async function getRecipeById(id) {
  const response = await fetch('http://localhost:3030/data/recipes/' + id);
  const recipe = await response.json();

  return recipe;
}

function createRecipePreview(recipe) {
  const result = e(
    'article',
    { className: 'preview', onClick: toggleCard },
    e('div', { className: 'title' }, e('h2', {}, recipe.name)),
    e('div', { className: 'small' }, e('img', { src: recipe.img }))
  );

  return result;

  async function toggleCard() {
    const fullRecipe = await getRecipeById(recipe._id);

    result.replaceWith(createRecipeCard(fullRecipe));
  }
}

function createRecipeCard(recipe) {
  const result = e(
    'article',
    { id: recipe._ownerId, className: 'after' },
    e('h2', {}, recipe.name),
    e(
      'div',
      { className: 'band' },
      e('div', { className: 'thumb' }, e('img', { src: recipe.img })),
      e(
        'div',
        { className: 'ingredients' },
        e('h3', {}, 'Ingredients:'),
        e(
          'ul',
          {},
          recipe.ingredients.map((i) => e('li', {}, i))
        )
      )
    ),
    e(
      'div',
      { className: 'description' },
      e('h3', {}, 'Preparation:'),
      recipe.steps.map((s) => e('p', {}, s))
    )
  );
  if (recipe._ownerId == sessionStorage.getItem('id')) {
    result.appendChild(
      e(
        'div',
        { className: 'controls' },
        e('button', { onClick: () => showEdit(recipe._id) }, '\u270E Edit'),
        e('button', { onClick: onDelete }, '\u2716 Delete')
      )
    );
  }
  function onDelete() {
    const confirmed = confirm(
      `Are you sure you want to delete ${recipe.name}?`
    );
    if (confirmed) {
      deleteRecipeById(recipe._id);
    }
  }
  async function deleteRecipeById(id) {
    const token = sessionStorage.getItem('authToken');

    try {
      const response = await fetch('http://localhost:3030/data/recipes/' + id, {
        method: 'delete',
        headers: {
          'X-Authorization': token,
        },
      });

      if (response.status != 200) {
        const error = await response.json();
        throw new Error(error.message);
      }

      main.innerHTML = '';
      main.appendChild(e('article', {}, e('h2', {}, 'Recipe deleted')));
    } catch (err) {
      alert(err.message);
    }
  }
  async function showEdit(recipeId) {
    const recipe = await getRecipeById(recipeId);
    console.log(recipe);

    const article = document.createElement('article');
    article.innerHTML = `<h2>Edit Recipe</h2>
            <form id="editForm">
                <label>Name: <input type="text" name="name" placeholder="Recipe name" value="${
                  recipe.name
                }"></label>
                <label>Image: <input type="text" name="img" placeholder="Image URL" value="${
                  recipe.img
                }"></label>
                <label class="ml">Ingredients: <textarea name="ingredients" placeholder="Enter ingredients on separate lines" >${recipe.ingredients.join(
                  '\n'
                )}</textarea></label>
                <label class="ml">Preparation: <textarea name="steps" placeholder="Enter preparation steps on separate lines" >${recipe.steps.join(
                  '\n'
                )}</textarea></label>
                <input type="submit" value="Update Recipe">
            </form>`;
    main.replaceChildren(article);
    const editForm = document.getElementById('editForm');
    edit(editForm, recipeId);
  }
  return result;
}

async function logout() {
  const response = await fetch('http://localhost:3030/users/logout', {
    method: 'get',
    headers: {
      'X-Authorization': sessionStorage.getItem('authToken'),
    },
  });

  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('id');
  onLoadRecipes();
}

export async function onLoadRecipes() {
  document.querySelectorAll('a').forEach((e) => e.classList.remove('active'));
  document.getElementById('catalog').classList.add('active');

  if (sessionStorage.getItem('authToken') != null) {
    document.getElementById('user').style.display = 'inline-block';
    document.getElementById('guest').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'inline-block';
    document.getElementById('logoutBtn').addEventListener('click', logout);
  } else {
    document.getElementById('guest').style.display = 'inline-block';
    document.getElementById('user').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'none';
  }

  const recipes = await getRecipes();
  const cards = recipes.map(createRecipePreview);

  main.innerHTML = '';
  cards.forEach((c) => main.appendChild(c));
}

function e(type, attributes, ...content) {
  const result = document.createElement(type);

  for (let [attr, value] of Object.entries(attributes || {})) {
    if (attr.substring(0, 2) == 'on') {
      result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
    } else {
      result[attr] = value;
    }
  }

  content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

  content.forEach((e) => {
    if (typeof e == 'string' || typeof e == 'number') {
      const node = document.createTextNode(e);
      result.appendChild(node);
    } else {
      result.appendChild(e);
    }
  });

  return result;
}
