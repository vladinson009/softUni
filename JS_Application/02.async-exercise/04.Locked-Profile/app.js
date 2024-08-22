function lockedProfile() {
  const url = 'http://localhost:3030/jsonstore/advanced/profiles';
  const main = document.getElementById('main');

  async function getProfiles() {
    try {
      const response = await fetch(url);
      if (response.ok == false) {
        throw new Error(`Status ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      const users = Object.values(data);
      createProfiles(users);
    } catch (error) {
      throw error.message;
    }
  }

  function createProfiles(data) {
    for (let profile of data) {
      const div = document.createElement('div');
      div.className = 'profile';
      div.addEventListener('click', onButton);
      div.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
<label>Lock</label>
<input type="radio" name="${profile.username}Locked" value="lock" checked>
<label>Unlock</label>
<input type="radio" name="${profile.username}Locked" value="unlock"><br>
<hr>
<label>Username</label>
<input type="text" name="${profile.username}" value="${profile.username}" disabled readonly />
<div class="hiddenInfo">
<hr>
<label>Email:</label>
<input type="email" name="${profile.email}" value="${profile.email}" disabled readonly />
<label>Age:</label>
<input type="email" name="${profile.age}" value="${profile.age}" disabled readonly />
</div>
<button>Show more</button>`;
      main.appendChild(div);
    }
  }
  function onButton(e) {
    const target = e.target;
    const parent = target.parentElement;
    const hiddenElements = parent.querySelector('div');
    const radioBtn = parent.querySelector(
      '[value="unlock"][type ="radio"]'
    ).checked;
    if (radioBtn && target.tagName == 'BUTTON') {
      if (target.textContent == 'Show more') {
        hiddenElements.classList.remove('hiddenInfo');
        target.textContent = 'Hide it';
      } else if (target.textContent == 'Hide it') {
        hiddenElements.classList.add('hiddenInfo');
        target.textContent = 'Show more';
      }
    }
  }
  getProfiles();
}
