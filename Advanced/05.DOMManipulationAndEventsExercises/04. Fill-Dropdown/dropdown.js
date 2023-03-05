function addItem() {
    const newItem = document.getElementById('newItemText');
    const newItemValue = document.getElementById('newItemValue');
    const select = document.createElement('option');

    [select.value, select.textContent] = [newItemValue.value, newItem.value];
    [newItem.value, newItemValue.value] = ['', ''];

    document.getElementById('menu').appendChild(select);
}