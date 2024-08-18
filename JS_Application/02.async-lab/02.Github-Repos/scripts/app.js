function loadRepos() {
  const username = document.getElementById('username').value;
  const link = `https://api.github.com/users/${username}/repos`;
  const reposUl = document.querySelector('#repos');
  reposUl.replaceChildren();

  async function gitRepost() {
    try {
      const response = await fetch(link);
      console.log(response);
      if (response.ok == false) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      for (let repo of data) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = repo.html_url;
        a.textContent = repo.full_name;
        li.appendChild(a);
        reposUl.appendChild(li);
      }
    } catch (error) {
      reposUl.innerHTML = error.message;
    }
  }
  gitRepost();
}
