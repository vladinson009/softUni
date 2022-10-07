function diagonalAttack(input) {
    const matrix = [];
    for (let i = 0; i < input.length; i++) {
        const arr = input[i].split(' ').map(Number);
        matrix.push(arr);
    }
    const r = matrix[0].length;
    let sumFirstDiagonal = 0;
    let sumSecondDiagonal = 0;
    for (let i = 0; i < r; i++) {
        sumFirstDiagonal += matrix[i][i];
        sumSecondDiagonal += matrix[r - 1 - i][r - 1 - i];
    }
    if (sumFirstDiagonal == sumSecondDiagonal) {
        for (let i = 0; i < r; i++) {
            for (let k = 0; k < r; k++) {
                if (i != k && i != r - 1 - k) {
                    matrix[i][k] = sumFirstDiagonal;
                }
            }
        }
    }
    for (arr of matrix) {
        console.log(arr.join(' '));
    }
};
diagonalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'
]);