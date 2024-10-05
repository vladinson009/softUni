import { getById, deleteFurniture } from '/src/api.js';
import { html } from '/src/util.js';

const detailsTemplate = (data, isOwner, onDelete) => html`<div class="container">
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Furniture Details</h1>
    </div>
  </div>
  <div class="row space-top">
    <div class="col-md-4">
      <div class="card text-white bg-primary">
        <div class="card-body">
          <img src=${data.img[0] == '.' ? data.img.slice(1) : data.img} />
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <p>Make: <span>${data.make}</span></p>
      <p>Model: <span>${data.model}</span></p>
      <p>Year: <span>${data.year}</span></p>
      <p>Description: <span>${data.description}</span></p>
      <p>Price: <span>${data.price}</span></p>
      <p>Material: <span>${data.material}</span></p>
      ${isOwner
        ? html`<div>
            <a href="/edit/${data._id}" class="btn btn-info">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="btn btn-red">Delete</a>
          </div>`
        : null}
    </div>
  </div>
</div>`;

export async function showDetails(context) {
  const movieId = context.params.id;
  const data = await getById(movieId);
  const ownerId = data._ownerId;
  const userId = context.userData().id;
  const isOwner = ownerId === userId;

  context.render(detailsTemplate(data, isOwner, onDelete));
  function onDelete() {
    const areYouSure = confirm('Are you sure you want to delete this movie?');
    if (areYouSure) {
      deleteFurniture(movieId);
      context.page.redirect('/');
    }
  }
}
