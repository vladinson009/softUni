function addAndSubtract(list) {
    const previousSum = list.reduce((a, b) => a + b, 0);
    for (let i = 0; i < list.length; i++) {
        if (list[i] % 2 == 0) {
            list[i] = list[i] + i;
        } else {
            list[i] = list[i] - i;
        }
    }
    const currentSum = list.reduce((a, b) => a + b, 0);

    console.log(list);
    console.log(previousSum);
    console.log(currentSum);
}
addAndSubtract([5, 15, 23, 56, 35]);