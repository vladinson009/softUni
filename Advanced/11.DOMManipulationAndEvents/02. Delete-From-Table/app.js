function deleteByEmail() {
    const table = Array.from(document.querySelectorAll('tbody tr'));
    const result = document.getElementById('result');
    const input = document.getElementsByTagName('input')[0];

    for (let each of table) {
        if (input.value == each.children[1].textContent) {
            each.remove();
            result.textContent = 'Deleted.';
        } else {
            result.textContent = 'Not found.';
        }
    }

}