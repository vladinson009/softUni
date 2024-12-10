import { html } from '../../node_modules/lit-html/lit-html.js';
import { createRecord } from '../api/data.js';

const createTemplate = (onSubmit, errors) => html`<div class="row space-top">
    <div class="col-md-12">
      <h1>Create New Furniture</h1>
      <p>Please fill all fields.</p>
    </div>
  </div>
  <form @submit=${onSubmit}>
    <div class="row space-top">
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-make">Make</label>
          <input class="form-control ${errors?.make}" id="new-make" type="text" name="make" />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class="form-control ${errors?.model}" id="new-model" type="text" name="model" />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class="form-control ${errors?.year}" id="new-year" type="number" name="year" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input
            class="form-control ${errors?.description}"
            id="new-description"
            type="text"
            name="description"
          />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input
            class="form-control ${errors?.price}"
            id="new-price"
            type="number"
            name="price"
          />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control ${errors?.img}" id="new-image" type="text" name="img" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class="form-control" id="new-material" type="text" name="material" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>`;

export async function createPage(ctx) {
  ctx.render(createTemplate(onSubmit));

  async function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = [...formData.entries()].reduce((a, [k, v]) => Object.assign(a, { [k]: v }), {});

    const errors = Object.entries(data)
      .filter(([k, v]) => k != 'material')
      .reduce((acc, [k, v]) => {
        if (v == '') {
          Object.assign(acc, { [k]: 'is-invalid' });
        } else {
          Object.assign(acc, { [k]: 'is-valid' });
        }
        return acc;
      }, {});

    if (
      Object.entries(data)
        .filter(([k, v]) => k != 'material')
        .some(([k, v]) => v == '')
    ) {
      alert('Please fill all mandatory fields!');
      return ctx.render(createTemplate(onSubmit, errors));
    }

    data.year = Number(data.year);
    data.price = Number(data.price);
    await createRecord(data);

    ctx.page.redirect('/');
  }
}
