function solve() {
  const section = document.querySelectorAll('section');
  const result = document.getElementById('results');

  for (let each of section) {
    each.addEventListener('click', onClick);
  }

  const rightAnswers = [
    'onclick',
    'JSON.stringify()',
    'A programming API for HTML and XML documents'
  ];
  let i = 0;
  let points = 0;

  function onClick(e) {
    if (e.target.className.includes('answer-text')) {

      if (rightAnswers[i] == (e.target.textContent)) {
        points++;
      }
      section[i].style.display = 'none';


      if (section[i + 1] != undefined) {
        section[i + 1].style.display = 'block';
        i++
      } else {
        result.style.display = 'block';
        result.children[0].children[0].textContent = points < section.length ? `You have ${points} right answers` :
          'You are recognized as top JavaScript fan!';
      }
    }
  }
}