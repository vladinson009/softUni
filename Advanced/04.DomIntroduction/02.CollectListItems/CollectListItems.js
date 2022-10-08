function extractText() {
    const list = Array.from(document.getElementById('items').children);
    const result = document.getElementById('result');
    for (let current of list) {
        result.value += current.textContent + '\n'
    }
}