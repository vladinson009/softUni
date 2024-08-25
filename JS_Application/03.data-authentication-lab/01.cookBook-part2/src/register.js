window.addEventListener('load', async () => {
  const form = document.querySelector('form');
  form.addEventListener('submit', onRegister);

  async function onRegister(event) {
    event.preventDefault();
    const url = 'http://localhost:3030/users/register';
    const form = event.target;
    const formData = new FormData(form);

    const email = formData.get('email').trim();
    const password = formData.get('password').trim();
    const repass = formData.get('rePass').trim();
    try {
      if (!email || !password || !repass) {
        throw new Error('All fields are required');
      } else if (password != repass) {
        throw new Error("Password don't match");
      }
      const options = {
        method: 'post',
        header: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, repass }),
      };

      const response = await fetch(url, options);
      if (response.ok != true) {
        const err = await response.json();
        throw new Error(`Error: ${err.message}`);
      }
      const data = await response.json();
      localStorage.setItem('token', data.accessToken);
      window.location = '/index.html';
    } catch (err) {
      alert(err.message);
      return;
    }
  }
});
