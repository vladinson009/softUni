function diagotnalAttack(arr) {
    const matrix = [];
    for (let i = 0; i < arr.length; i++) {
        matrix.push(arr[i].split(' ').map(Number));
    }
    let firstDiag = 0;
    let secondDiag = 0;
    for (let i = 0; i < matrix.length; i++) {
        firstDiag += matrix[i][i];
        secondDiag += matrix[i][matrix.length - 1 - i];
    }
    if (firstDiag == secondDiag) {
        for (let i = 0; i < matrix.length; i++) {
            for (let k = 0; k < matrix.length; k++) {
                if (i != k && k != matrix.length - 1 - i) {
                    matrix[i][k] = firstDiag;
                }
            }
        }
    }
    matrix.forEach(x => console.log(x.join(' ')));
}

diagotnalAttack(['5 3 12 3 1',
    '11 4 23 2 5',
    '101 12 3 21 10',
    '1 4 5 2 2',
    '5 22 33 11 1'
]);