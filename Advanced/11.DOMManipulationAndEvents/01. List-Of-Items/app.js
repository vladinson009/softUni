function addItem() {
    const btn = document.getElementById('newItemText');
    const items = document.getElementById('items');

    const liItem = document.createElement('li');
    liItem.textContent = btn.value;
    btn.value = '';
    items.appendChild(liItem);
}