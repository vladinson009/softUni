function sumTable() {
    const prices = document.querySelectorAll('tbody tr');
    const result = document.getElementById('sum');
    let sum = 0;
    for (let i = 1; i < prices.length; i++) {
        sum += Number(prices[i].lastChild.textContent);
    }
    result.textContent = sum;
}