function addItem() {
    const btn = document.getElementById('newItemText');
    const items = document.getElementById('items');

    const liItem = document.createElement('li');
    liItem.textContent = btn.value;
    btn.value = '';
    items.appendChild(liItem);

    const aElement = document.createElement('a');
    aElement.textContent = '[Delete]';
    aElement.href = '#';
    aElement.addEventListener('click', (e) => e.target.parentElement.remove());
    liItem.appendChild(aElement);
}