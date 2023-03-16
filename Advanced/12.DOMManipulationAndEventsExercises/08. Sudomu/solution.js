function solve() {
    const row = document.querySelectorAll('tbody tr');
    const [checkBtn, clearBtn] = document.querySelectorAll('button');
    const text = document.querySelector('#check p');
    const border = row[0].parentElement.parentElement;
    checkBtn.addEventListener('click', check);
    clearBtn.addEventListener('click', clear)

    function check() {
        let isBreak = false;
        for (let i = 0; i < row.length; i++) {
            const sumH = [];
            const sumV = [];
            for (let j = 0; j < row.length; j++) {
                const horizontal = Number(row[i].children[j].children[0].value);
                const vertical = Number(row[j].children[i].children[0].value);

                if (!sumH.includes(horizontal) && !sumV.includes(vertical) &&
                    horizontal < 4 && horizontal > 0 && vertical < 4 && vertical > 0) {
                    sumH.push(horizontal);
                    sumV.push(vertical);
                } else {
                    isBreak = true;
                    break;
                }
            }

            if (sumH.reduce((a, b) => a + b, 0) != sumV.reduce((a, b) => a + b, 0)) {
                isBreak = true;
            }
            if (isBreak) {
                border.style.border = "2px solid red";
                text.textContent = 'NOP! You are not done yet...';
                text.style.color = "red";
                return

            }
        }
        border.style.border = "2px solid green";
        text.textContent = 'You solve it! Congratulations!';
        text.style.color = "green";

    }

    function clear() {
        for (let i = 0; i < row.length; i++) {
            for (let j = 0; j < row.length; j++) {
                row[i].children[j].children[0].value = '';

            }

        }
        border.style.border = '';
        text.textContent = '';
    }
}