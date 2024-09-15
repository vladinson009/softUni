let view;
let currentTarget;
let postId;
const main = document.querySelector('main');
const container = document.querySelector('.container');
export async function getA(e) {
  let target;
  if (e != undefined) {
    e.preventDefault();
    target = e.target.parentElement;
    currentTarget = target;
  } else {
    target = currentTarget;
  }
  if (target.tagName == 'A' && target.className == 'normal') {
    const id = target.id;
    postId = id;

    const [response, responseComment] = await Promise.all([
      fetch('http://localhost:3030/jsonstore/collections/myboard/posts/' + id),
      fetch('http://localhost:3030/jsonstore/collections/myboard/comments/'),
    ]);

    const [data, dataComment] = await Promise.all([
      response.json(),
      responseComment.json(),
    ]);
    const comments = Object.values(dataComment);
    main.style.display = 'none';
    const div = document.createElement('div');
    view = div;
    div.className = 'comment';
    div.innerHTML = `<h2>${data.topicName}</h2>
    <div class="header">
    <img src="./static/profile.png" alt="avatar">
    <p><span>${data.username}</span> posted on <time>${data.date}</time></p>
    
    <p class="post-content">${data.postText}</p>
    </div>`;
    const fillteredComment = comments.filter((el) => el.postId == id);
    if (fillteredComment.length > 0) {
      fillteredComment.forEach((el) => {
        div.innerHTML += `<div id="${el._id}">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <p><strong>${el.username}</strong> commented on <time>${el.date}</time></p>
                <div class="post-content">
                    <p>${el.comment}</p>
                </div>
            </div>
        </div>
    </div>`;
      });
    }
    const formDiv = document.createElement('div');
    formDiv.innerHTML = `<span>currentUser comment:</span>
    <form id ="postForm">
    <label for="comment">Comment *</label>
    <input type="textarea" name="comment" placeholder="comment" />
    <label for="username">Username *</label>
  <input type="text" name="username" placeholder="username" />

  <input type="submit" value="Post" />
</form>
      `;

    div.appendChild(formDiv);
    container.appendChild(div);

    const form = document.getElementById('postForm');
    form.addEventListener('submit', onSubmit);
  }
}

async function onSubmit(e) {
  e.preventDefault();
  const target = e.target;
  const newDate = new Date();
  const formData = new FormData(target);

  const comment = formData.get('comment').trim();
  const username = formData.get('username').trim();
  if (comment == '' || username == '') {
    return;
  }
  const date = newDate.toLocaleString('en-US');
  const bodyData = {
    username,
    comment,
    date,
    postId,
  };

  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyData),
  };
  await fetch(
    'http://localhost:3030/jsonstore/collections/myboard/comments',
    options
  );
  view.remove();
  getA();
  target.reset();
}
