function magicMatrices(matrix) {
    let magic = true;
    const sum = matrix[0].reduce((a, b) => a + b, 0);
    for (let i = 0; i < matrix.length; i++) {
        let row = 0;
        let col = 0;
        for (let k = 0; k < matrix.length; k++) {
            row += matrix[i][k];
            col += matrix[k][i];
        }
        if (row != sum || col != sum) {
            magic = false;
        }
    }
    return magic;
}
magicMatrices([
    [4, 5, 6],
    [6, 5, 4],
    [5, 5, 5]
]);