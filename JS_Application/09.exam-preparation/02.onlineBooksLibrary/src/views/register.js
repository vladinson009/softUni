import { register } from '../api/api.js';
import html from '../lib.js';

const registerTemplate = (onSubmit) => html`<section id="register-page" class="register">
  <form @submit=${onSubmit} id="register-form" action="" method="">
    <fieldset>
      <legend>Register Form</legend>
      <p class="field">
        <label for="email">Email</label>
        <span class="input">
          <input type="text" name="email" id="email" placeholder="Email" />
        </span>
      </p>
      <p class="field">
        <label for="password">Password</label>
        <span class="input">
          <input type="password" name="password" id="password" placeholder="Password" />
        </span>
      </p>
      <p class="field">
        <label for="repeat-pass">Repeat Password</label>
        <span class="input">
          <input
            type="password"
            name="confirm-pass"
            id="repeat-pass"
            placeholder="Repeat Password"
          />
        </span>
      </p>
      <input class="button submit" type="submit" value="Register" />
    </fieldset>
  </form>
</section>`;

export function registerPage(ctx) {
  ctx.render(registerTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();

    const form = new FormData(e.target);
    const email = form.get('email').trim();
    const password = form.get('password').trim();
    const confirmPass = form.get('confirm-pass').trim();

    if (!email || !password || !confirmPass) {
      return alert('All fields are required!');
    }
    const data = register(email, password);
    ctx.setUserData(data);
    ctx.updateNavigation();
    ctx.page.redirect('/');
  }
}
