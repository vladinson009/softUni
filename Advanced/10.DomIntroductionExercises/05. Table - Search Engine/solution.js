function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   const cells = Array.from(document.querySelectorAll('tbody tr'));
   const searchField = document.getElementById('searchField');

   function onClick() {
      for (let cell of cells) {
         if (cell.textContent.includes(searchField.value)) {
            cell.classList.add('select');
         } else {
            cell.classList.remove('select');

         }
      }
      searchField.value = '';
   }
}