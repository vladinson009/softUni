import { login } from '/api.js';
import { html } from '/lib.js';

const loginTemplate = (onLogin, error) => html`<section id="login">
  <article class="narrow">
    <header class="pad-med">
      <h1>Login</h1>
    </header>
    <form @submit=${onLogin} id="login-form" class="main-form pad-large">
      ${error ? html` <div class="error">${error}</div>` : null}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <input class="action cta" type="submit" value="Sign In" />
    </form>
    <footer class="pad-small">
      Don't have an account? <a href="/register" class="invert">Sign up here</a>
    </footer>
  </article>
</section>`;

export function showLogin(ctx) {
  ctx.render(loginTemplate(onLogin));
  ctx.updateNavBar();

  async function onLogin(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get('email').trim();
    const password = form.get('password').trim();
    try {
      if (email == '') {
        throw new Error('Email is required!');
      } else if (password == '') {
        throw new Error('Password is required!');
      } else {
        const data = await login(email, password);
        ctx.userData('set', data);
        ctx.updateNavBar();
        ctx.page.redirect('/my-teams');
      }
    } catch (error) {
      ctx.render(loginTemplate(onLogin, error.message));
    }
  }
}
