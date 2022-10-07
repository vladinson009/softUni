function equalArrays(firstList, secondList) {
    let sum = 0;
    for (let i = 0; i < firstList.length; i++) {
        const firstNum = Number(firstList[i]);
        const secondNum = Number(secondList[i]);

        if (firstNum == secondNum) {
            sum += firstNum;
        } else {
            console.log(`Arrays are not identical. Found difference at ${i} index`);
            return;
        }
    }
    console.log(`Arrays are identical. Sum: ${sum}`);
}
equalArrays(['1', '2', '3', '4', '5'], ['1', '2', '4', '4', '5']);