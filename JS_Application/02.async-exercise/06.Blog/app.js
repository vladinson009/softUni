function attachEvents() {
  document
    .getElementById('btnLoadPosts')
    .addEventListener('click', getAllPosts);
  document.getElementById('btnViewPost').addEventListener('click', displayData);
}

attachEvents();

async function displayData() {
  const titleElement = document.getElementById('post-title');
  const bodyElement = document.getElementById('post-body');
  const ulElement = document.getElementById('post-comments');

  titleElement.textContent = 'Loading...';
  bodyElement.textContent = '';
  ulElement.replaceChildren();

  const postId = document.getElementById('posts').value;
  const [post, comments] = await Promise.all([
    getPostById(postId),
    getCommentsByPostId(postId),
  ]);

  titleElement.textContent = post.title;
  bodyElement.textContent = post.body;

  comments.forEach((comment) => {
    const liComment = document.createElement('li');
    liComment.id = comment.id;
    liComment.textContent = comment.text;
    ulElement.appendChild(liComment);
  });
}

async function getAllPosts() {
  const url = 'http://localhost:3030/jsonstore/blog/posts';
  const response = await fetch(url);
  const data = Object.values(await response.json());

  const posts = document.getElementById('posts');
  posts.replaceChildren();

  data.forEach((el) => {
    const option = document.createElement('option');
    option.value = el.id;
    option.textContent = el.title.toUpperCase();
    posts.appendChild(option);
  });
}

async function getPostById(postId) {
  try {
    const url = 'http://localhost:3030/jsonstore/blog/posts/' + postId;
    const response = await fetch(url);
    if (response.ok == false) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error.message;
  }
}
async function getCommentsByPostId(postId) {
  try {
    const url = 'http://localhost:3030/jsonstore/blog/comments';
    const response = await fetch(url);
    if (response.ok == false) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    const data = await response.json();
    const comments = Object.values(data).filter((c) => c.postId == postId);
    return comments;
  } catch (error) {
    throw error.message;
  }
}
