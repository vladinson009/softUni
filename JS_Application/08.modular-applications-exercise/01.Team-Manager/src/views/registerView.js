import { register } from '/api.js';
import { html } from '/lib.js';

const registerTemplate = (onRegister, error) => html`<section id="register">
  <article class="narrow">
    <header class="pad-med">
      <h1>Register</h1>
    </header>
    <form @submit=${onRegister} id="register-form" class="main-form pad-large">
      ${error ? html`<div class="error">${error}</div>` : null}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Username: <input type="text" name="username" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <label>Repeat: <input type="password" name="repass" /></label>
      <input class="action cta" type="submit" value="Create Account" />
    </form>
    <footer class="pad-small">
      Already have an account? <a href="/login" class="invert">Sign in here</a>
    </footer>
  </article>
</section>`;

export function showRegister(ctx) {
  const session = ctx.userData('get');
  session ? ctx.page.redirect('/') : '';
  ctx.updateNavBar();
  ctx.render(registerTemplate(onRegister));

  async function onRegister(ev) {
    ev.preventDefault();
    const form = new FormData(ev.target);
    const email = form.get('email').trim();
    const username = form.get('username').trim();
    const password = form.get('password').trim();
    const repass = form.get('repass').trim();
    try {
      if (!email.includes('@')) {
        throw new Error('Email is not valid!');
      }
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters!');
      }
      if (password.length < 3) {
        throw new Error('Password must be at least 3 characters!');
      }
      if (password !== repass) {
        throw new Error("Passwords doesnt't match!");
      }

      const data = await register(email, password, username);
      ctx.userData('set', data);
      ctx.page.redirect('/');
      ev.target.reset();
    } catch (error) {
      ctx.render(registerTemplate(onRegister, error.message));
    }
  }
}
