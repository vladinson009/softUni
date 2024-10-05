import { html } from '/src/util.js';
import { cardTemplate } from '/src/views/homeView.js';
import { getMyFurniture } from '/src/api.js';

const myFurnitureTemplate = (cards) => html`<div class="container">
  <div class="row space-top">
    <div class="col-md-12">
      <h1>My Furniture</h1>
      <p>This is a list of your publications.</p>
    </div>
  </div>
  <div class="row space-top">${cards}</div>
</div>`;

export async function showMyFurniture(context) {
  const myId = context.userData().id;

  const data = await getMyFurniture(myId);
  context.render(myFurnitureTemplate(data.map(cardTemplate)));
}
