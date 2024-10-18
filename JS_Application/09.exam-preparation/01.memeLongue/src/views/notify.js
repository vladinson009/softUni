const hiddenElement = document.querySelector('.notification');
const msgSpan = document.getElementById('errorMsg');
export function modal(message) {
  msgSpan.textContent = message;
  hiddenElement.style.display = 'inline-block';
  setTimeout(() => (hiddenElement.style.display = ''), 3000);
}
