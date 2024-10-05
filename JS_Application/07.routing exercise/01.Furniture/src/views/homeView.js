import { html, updateUserNav } from '/src/util.js';
import { getAllItems } from '/src/api.js';

const homeTemplate = (cards) => html`<div class="container">
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">${cards}</div>
</div>`;

export const cardTemplate = (data) => html`<div class="col-md-4">
  <div class="card text-white bg-primary">
    <div class="card-body">
      <img src=${data.img[0] == '.' ? data.img.slice(1) : data.img} />
      <p>${data.description}</p>
      <footer>
        <p>Price: <span>${data.price} $</span></p>
      </footer>
      <div>
        <a href="/details/${data._id}" class="btn btn-info">Details</a>
      </div>
    </div>
  </div>
</div>`;

export async function showHome(ctx) {
  const data = await getAllItems();
  updateUserNav();
  ctx.render(homeTemplate(data.map(cardTemplate)));
}
