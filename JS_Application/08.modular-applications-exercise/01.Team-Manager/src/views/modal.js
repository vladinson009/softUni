import { html } from '/lib.js';

const modalTemplate = (onClick, message) => html` <div class="overlay">
  <div class="modal">
    <p>${message}</p>
    <a @click=${onClick} href="#" class="action">OK</a>
  </div>
</div>`;

export function showModal(ctx, message, back) {
  ctx.render(modalTemplate(onClick, message));
  function onClick(e) {
    e.preventDefault();
    ctx.updateNavBar();
    ctx.render(back);
  }
}
