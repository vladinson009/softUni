import { addLike, deleteBook, getBookById, getLikeFromUser, getLikes } from '../api/data.js';
import html from '../lib.js';

const bookDetailsTemplate = (
  book,
  isOwner,
  nonOwnerUser,
  onLike,
  likes,
  getLike,
  onDelete
) => html`<section id="details-page" class="details">
  <div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src=${book.imageUrl} /></p>
    <div class="actions">
      ${isOwner
        ? html` <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>`
        : null}

      <!-- Bonus -->
      <!-- Like button ( Only for logged-in users, which is not creators of the current book ) -->
      ${nonOwnerUser && getLike < 1
        ? html`<a @click=${onLike} class="button" href="#">Like</a>`
        : null}

      <!-- ( for Guests and Users )  -->
      <div class="likes">
        <img class="hearts" src="/images/heart.png" />
        <span id="total-likes">Likes: ${likes}</span>
      </div>
      <!-- Bonus -->
    </div>
  </div>
  <div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
  </div>
</section>`;

export async function bookDetailsPage(ctx) {
  const userData = ctx.getUserData();
  const bookId = ctx.params.id;
  const [getLike, book, likes] = await Promise.all([
    getLikeFromUser(bookId, userData?.id),
    getBookById(bookId),
    getLikes(bookId),
  ]);

  const isOwner = book._ownerId === userData?.id;
  const nonOwnerUser = userData && book._ownerId !== userData?.id;

  ctx.render(bookDetailsTemplate(book, isOwner, nonOwnerUser, onLike, likes, getLike, onDelete));

  async function onLike(e) {
    e.preventDefault();
    await addLike(bookId);
    ctx.page.redirect('/details/' + bookId);
  }
  async function onDelete() {
    const confirmation = confirm('Are you sure you want to delete this book?');
    if (confirmation) {
      await deleteBook(bookId);
      ctx.page.redirect('/');
    }
  }
}
