function loadCommits() {
  const username = document.getElementById('username').value;
  const repo = document.getElementById('repo').value;
  const link = `https://api.github.com/repos/${username}/${repo}/commits`;
  const ul = document.getElementById('commits');
  ul.replaceChildren();
  async function fetchCommits() {
    try {
      const response = await fetch(link);

      if (response.ok == false) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      for (let commit of data) {
        const li = document.createElement('li');
        li.innerHTML = `${commit.author.name}: ${commit.message}`;
        ul.appendChild(li);
      }
    } catch (err) {}
  }
  fetchCommits();
}
