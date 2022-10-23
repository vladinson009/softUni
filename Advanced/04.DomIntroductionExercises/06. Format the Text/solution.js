function solve() {
  const textarea = document.getElementById('input');
  const output = document.getElementById('output');
  output.textContent = '';
  const regex = /[^.]+/g;
  const sentences = textarea.value.match(regex)
  let result = '';
  for (let i = 1; i <= sentences.length; i++) {
    result += `${sentences[i-1]}.`
    if (i % 3 == 0 || i == sentences.length) {
      const paragraph = document.createElement('p');
      paragraph.textContent = result;
      output.appendChild(paragraph);
      result = ''
    }
  }
}