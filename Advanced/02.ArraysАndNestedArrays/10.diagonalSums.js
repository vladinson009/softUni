function diagonalSum(matrix) {
    const l = matrix.length;
    let firstDiag = 0;
    let secondDiag = 0;
    for (let i = 0; i < l; i++) {
        firstDiag += Number(matrix[i][i]);
        secondDiag += Number(matrix[i][l - 1 - i]);
    }
    console.log(firstDiag, secondDiag);
}

diagonalSum([
    [20, 40],
    [10, 60]
]);