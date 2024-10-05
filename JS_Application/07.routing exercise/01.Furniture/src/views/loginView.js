import { login } from '/src/api.js';
import { html } from '/src/util.js';

const loginTemplate = (onSubmit) => html`<div class="container">
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Login User</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="email">Email</label>
          <input class="form-control" id="email" type="text" name="email" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="password">Password</label>
          <input class="form-control" id="password" type="password" name="password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </div>
    </div>
  </form>
</div>`;

export async function showLogin(ctx) {
  if (ctx.userData()) {
    ctx.page.redirect('/');
    return;
  }
  ctx.render(loginTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email').trim();
    const password = formData.get('password').trim();

    if (!email || !password) {
      return alert('All fields are required!');
    }
    await login(email, password);

    ctx.page.redirect('/');
  }
}
