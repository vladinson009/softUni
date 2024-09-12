import { onLoadRecipes } from './app.js';
export async function edit(form, id) {
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    onSubmit(
      [...formData.entries()].reduce(
        (p, [k, v]) => Object.assign(p, { [k]: v }),
        {}
      )
    );
  });

  async function onSubmit(data) {
    const body = JSON.stringify({
      name: data.name,
      img: data.img,
      ingredients: data.ingredients
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l != ''),
      steps: data.steps
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l != ''),
    });

    const token = sessionStorage.getItem('authToken');

    if (token == null) {
      onLoadRecipes();
    }

    try {
      const response = await fetch('http://localhost:3030/data/recipes/' + id, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token,
        },
        body,
      });

      if (response.status == 200) {
        onLoadRecipes();
        // window.location.pathname = 'index.html';
      } else {
        throw new Error(await response.json());
      }
    } catch (err) {
      console.error(err.message);
    }
  }
}
