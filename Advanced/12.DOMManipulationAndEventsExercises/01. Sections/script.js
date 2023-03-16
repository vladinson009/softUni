function create(words) {
   const content = document.getElementById('content');
   for (let word of words) {
      const div = document.createElement('div');
      div.addEventListener('click', onClick);
      const p = document.createElement('p');
      p.textContent = word;
      p.style.display = 'none';
      div.appendChild(p);
      content.appendChild(div);
   }

   function onClick(e) {
      e.target.firstChild.style.display = '';
   }
}