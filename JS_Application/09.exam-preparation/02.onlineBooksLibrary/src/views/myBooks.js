import { getMybooks } from '../api/data.js';
import html from '../lib.js';

const myBooksTemplate = (data) => html` <section id="my-books-page" class="my-books">
  <h1>My Books</h1>
  ${data.length !== 0
    ? html` <ul class="my-books-list">
        ${data.map(booksCard)}
      </ul>`
    : html`<p class="no-books">No books in database!</p>`}
</section>`;

const booksCard = (book) => html`<li class="otherBooks">
  <h3>${book.title}</h3>
  <p>Type: ${book.type}</p>
  <p class="img"><img src=${book.imageUrl} /></p>
  <a class="button" href="/details/${book._id}">Details</a>
</li>`;
export async function myBooksPage(ctx) {
  const userData = ctx.getUserData();
  const data = await getMybooks(userData?.id);

  ctx.render(myBooksTemplate(data));
}
