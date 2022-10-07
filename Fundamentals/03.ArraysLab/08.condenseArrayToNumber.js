function arrayToNumber(list) {
    while (list.length > 1) {
        const condensed = [];
        for (let i = 0; i < list.length - 1; i++) {
            const firstNum = Number(list[i]);
            const secondNum = Number(list[i + 1]);
            const sum = firstNum + secondNum;
            condensed.push(sum);
        }
        list = condensed;
    }
    console.log(list[0]);
}
arrayToNumber([1]);