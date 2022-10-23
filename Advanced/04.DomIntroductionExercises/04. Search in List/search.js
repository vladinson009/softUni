function search() {
   const towns = Array.from(document.getElementById('towns').children);
   const searchText = document.getElementById('searchText');
   const result = document.getElementById('result');
   let matches = 0;
   for (let each of towns) {
      if (each.textContent.toLowerCase().includes(searchText.value.toLowerCase()) && searchText.value.length > 0) {
         each.style.textDecoration = 'underline';
         each.style.fontWeight = 'bolder';
         matches++;
      } else {
         each.style.textDecoration = 'none';
         each.style.fontWeight = 'normal';
      }
   }

   result.textContent = `${matches} matches found`;
   matches = 0;
   searchText.value = '';
}