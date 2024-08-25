window.addEventListener('load', async () => {
  const loginForm = document.querySelector('form');
  loginForm.addEventListener('submit', onLogin);
  if (localStorage.token != null) {
    window.location = '/index.html';
  }
  async function onLogin(event) {
    event.preventDefault();

    const url = 'http://localhost:3030/users/login';
    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    try {
      const options = {
        method: 'post',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      };
      const response = await fetch(url, options);
      if (response.ok == false) {
        const error = await response.json();
        throw new Error(`Errpr: ${error.message}`);
      }
      const data = await response.json();
      console.log(data);

      const token = data.accessToken;
      localStorage.setItem('token', token);

      window.location = '/index.html';
    } catch (err) {
      alert(err.message);
    }
  }
});
