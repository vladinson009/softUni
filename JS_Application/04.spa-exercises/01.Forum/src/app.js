import { newPost, onCancel } from './postTopic.js';
import { getA } from './getPost.js';
const topicTitle = document.querySelector('.topic-title');
const postBtn = document.querySelector('.public');
const cancelBtn = document.querySelector('.cancel');
const main = document.querySelector('main');
const homePage = document.querySelector('.container');
const homeBtn = document.getElementById('homeBtn');

postBtn.addEventListener('click', newPost);
cancelBtn.addEventListener('click', onCancel);
main.addEventListener('click', getA);
homeBtn.addEventListener('click', onHome);

onLoad();

async function onLoad() {
  topicTitle.replaceChildren('Loading...');
  const response = await fetch(
    'http://localhost:3030/jsonstore/collections/myboard/posts'
  );
  const data = Object.values(await response.json());
  topicTitle.replaceChildren();

  data.forEach((data) => {
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
  });
}

function onHome(e) {
  e.preventDefault();
  homePage.removeChild(document.querySelector('.comment'));
  main.style.display = '';
  onLoad();
}
