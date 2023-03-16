function subtract() {
    const first = document.getElementById('firstNumber').value;
    const second = document.getElementById('secondNumber').value;
    const result = document.getElementById('result');

    const sum = Number(first) - Number(second);
    result.appendChild(document.createElement('div'));
    result.firstChild.textContent = sum;
}