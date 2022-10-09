function solve() {
  let text = document.getElementById('text').value;
  const convention = document.getElementById('naming-convention').value;
  text = text.split(' ');
  const result = [];

  if (convention == 'Camel Case') {
    result.push(text[0][0].toLowerCase(), text[0].slice(1).toLowerCase());
    for (let i = 1; i < text.length; i++) {
      result.push(text[i][0].toUpperCase() + text[i].slice(1).toLowerCase());
    }
  } else if (convention == 'Pascal Case') {
    result.push(text[0][0].toUpperCase(), text[0].slice(1).toLowerCase());
    for (let i = 1; i < text.length; i++) {
      result.push(text[i][0].toUpperCase() + text[i].slice(1).toLowerCase());
    }
  } else {
    result.push('Error!');
  }
  document.getElementById('result').textContent = result.join('');
}