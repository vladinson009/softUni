function notify(message) {
  const notification = document.querySelector('#notification');
  notification.style.display = 'block';
  notification.textContent = message;
  notification.addEventListener('click', () => notification.style.display = 'none');
};