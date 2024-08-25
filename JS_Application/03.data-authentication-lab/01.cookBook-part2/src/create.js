window.addEventListener('load', async () => {
  const token = localStorage.getItem('token');
  if (token == null) {
    window.location = '/login.html';
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', onCreate);

  async function onCreate(event) {
    const url = 'http://localhost:3030/data/recipes';
    event.preventDefault();
    const formData = new FormData(form);

    const name = formData.get('name').trim();
    const img = formData.get('img').trim();
    const ingredients = formData.get('ingredients').trim().split('\n');
    const steps = formData.get('steps').trim().split('\n');
    const recipe = { name, img, ingredients, steps };

    const token = localStorage.getItem('token');
    if (token == null) {
      window.location = '/login.html';
      return;
    }

    const options = {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': token,
      },
      body: JSON.stringify(recipe),
    };
    try {
      const response = await fetch(url, options);

      await response.json();
      window.location = '/index.html';
    } catch (er) {
      throw er.message;
    }
  }
});
