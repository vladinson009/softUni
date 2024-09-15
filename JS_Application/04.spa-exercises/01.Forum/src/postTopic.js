const form = document.querySelector('form');
const topicTitle = document.querySelector('.topic-title');
export function onCancel(e) {
  e.preventDefault();
  form.reset();
}

export async function newPost(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const topicName = formData.get('topicName').trim();
  const username = formData.get('username').trim();
  const postText = formData.get('postText').trim();
  console.log(topicName);

  if (topicName == '' || username == '' || postText == '') {
    return;
  }
  const date = new Date();
  const localeDate = date.toLocaleString('en-US');
  const content = {
    topicName,
    username,
    postText,
    date: localeDate,
  };
  const response = await fetch(
    'http://localhost:3030/jsonstore/collections/myboard/posts',
    {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    }
  );
  const data = await response.json();
  renderNewPost(data);
  form.reset();
}

function renderNewPost(data) {
  const div = document.createElement('div');
  div.className = 'topic-container';

  div.innerHTML = `<div class="topic-name-wrapper">
        <div class="topic-name">
            <a href="#" id="${data._id}" class="normal">
                <h2>${data.topicName}</h2>
            </a>
            <div class="columns">
                <div>
                    <p>Date: <time>${data.date}</time></p>
                    <div class="nick-name">
                        <p>Username: <span>${data.username}</span></p>
                    </div>
                </div>


            </div>
        </div>
    </div>`;
  topicTitle.appendChild(div);
}
