function biggestElement(matrix) {
    return Math.max(...matrix.flat());
}
console.log(biggestElement([
    [20, 50, 10],
    [8, 33, 145]
]));