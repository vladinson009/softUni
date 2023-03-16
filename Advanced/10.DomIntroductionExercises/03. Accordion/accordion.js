function toggle() {
    const button = document.querySelectorAll('.button')[0];
    const text = document.getElementById('extra');

    if (button.textContent == 'More') {
        button.textContent = 'Less';
        text.style.display = 'block';
    } else {
        button.textContent = 'More';
        text.style.display = 'none';
    }
}