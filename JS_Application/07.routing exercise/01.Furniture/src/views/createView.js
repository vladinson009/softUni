import { createFurniture } from '/src/api.js';
import { html, userData } from '/src/util.js';

const createTemplate = (onSubmit) => html`<div class="container">
  <div class="row space-top">
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
          <input class="form-control" id="new-make" type="text" name="make" />
        </div>
        <div class="form-group has-success">
          <label class="form-control-label" for="new-model">Model</label>
          <input class="form-control" id="new-model" type="text" name="model" />
        </div>
        <div class="form-group has-danger">
          <label class="form-control-label" for="new-year">Year</label>
          <input class="form-control" id="new-year" type="number" name="year" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-description">Description</label>
          <input class="form-control" id="new-description" type="text" name="description" />
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-group">
          <label class="form-control-label" for="new-price">Price</label>
          <input class="form-control" id="new-price" type="number" name="price" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-image">Image</label>
          <input class="form-control" id="new-image" type="text" name="img" />
        </div>
        <div class="form-group">
          <label class="form-control-label" for="new-material">Material (optional)</label>
          <input class="form-control" id="new-material" type="text" name="material" />
        </div>
        <input type="submit" class="btn btn-primary" value="Create" />
      </div>
    </div>
  </form>
</div>`;

export function showCreate(context) {
  if (!context.userData()) {
    context.page.redirect('/');
    return;
  }
  context.render(createTemplate(onSubmit));

  async function onSubmit(e) {
    e.preventDefault();
    let boolean = false;
    const form = e.target;
    let [make, model, year, description, price, img, material] = form.querySelectorAll('input');
    if (make.value.length < 4) {
      boolean = true;
      make.classList.add('is-invalid');
      make.classList.remove('is-valid');
      return alert('Make and Model must be at least 4 symbols long');
    } else {
      make.classList.remove('is-invalid');
      make.classList.add('is-valid');
    }
    if (model.value.length < 4) {
      boolean = true;
      model.classList.add('is-invalid');
      model.classList.remove('is-valid');
      return alert('Make and Model must be at least 4 symbols long');
    } else {
      model.classList.remove('is-invalid');
      model.classList.add('is-valid');
    }
    if (Number(year.value) >= 1950 && Number(year.value) <= 2050) {
      year.classList.add('is-valid');
      year.classList.remove('is-invalid');
    } else {
      boolean = true;
      year.classList.remove('is-valid');
      year.classList.add('is-invalid');
      return alert('Year must be between 1950 and 2050');
    }
    if (description.value.length > 10) {
      description.classList.add('is-valid');
      description.classList.remove('is-invalid');
    } else {
      boolean = true;
      description.classList.remove('is-valid');
      description.classList.add('is-invalid');
      return alert('Description must be more than 10 symbols');
    }
    if (Number(price.value) <= 0) {
      boolean = true;
      price.classList.add('is-invalid');
      price.classList.remove('is-valid');
      return alert('Price must be a positive number');
    } else {
      price.classList.remove('is-invalid');
      price.classList.add('is-valid');
    }
    if (img.value.trim() == '') {
      boolean = true;
      img.classList.add('is-invalid');
      img.classList.remove('is-valid');
      return alert('Image URL is required');
    } else {
      img.classList.remove('is-invalid');
      img.classList.add('is-valid');
    }
    if (boolean) {
      return;
    }
    const data = {
      _ownerId: userData().id,
      make: make.value,
      model: model.value,
      year: Number(year.value),
      description: description.value,
      price: Number(price.value),
      img: img.value,
      material: material.value,
    };
    await createFurniture(data);
    context.page.redirect('/');
  }
}
