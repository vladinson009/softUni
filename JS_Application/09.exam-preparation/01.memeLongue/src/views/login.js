import { login } from '../api/api.js';
import { html } from '../lib.js';
import { modal } from './notify.js';

const loginTemplate = (onSubmit) => html`<section id="login">
  <form @submit=${onSubmit} id="login-form">
    <div class="container">
      <h1>Login</h1>
      <label for="email">Email</label>
      <input id="email" placeholder="Enter Email" name="email" type="text" />
      <label for="password">Password</label>
      <input id="password" type="password" placeholder="Enter Password" name="password" />
      <input type="submit" class="registerbtn button" value="Login" />
      <div class="container signin">
        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
      </div>
    </div>
  </form>
</section>`;

export function loginPage(ctx) {
  ctx.updateNavigation();
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);

    const email = form.get('email').trim();
    const password = form.get('password').trim();

    if (!email || !password) {
      return modal('All fields are required!');
    }

    const data = await login(email, password);
    e.target.reset();
    ctx.setUserData(data);
    ctx.updateNavigation();
    ctx.page.redirect('/catalog');
  }
}
