function spiralMatrix(row, column) {
    const matrix = [];
    for (let i = 0; i < row; i++) {
        matrix.push([]);
    }
    ////////////
    let firstRow = 0;
    let lastColumn = column - 1;
    let lastRow = row - 1;
    let firstColumn = 0;

    let counter = 1;


    // while (firstRow <= lastRow && firstColumn <= lastColumn) {
    // }
    for (let i = firstRow; i <= lastRow; i++) {

        for (let j = firstRow; j <= lastRow; j++) {
            matrix[firstColumn][j] = counter++;
        }
        firstColumn++;
        for (let j = firstColumn; j <= lastColumn; j++) {
            matrix[j][lastRow] = counter++;
        }
        lastRow--;

        for (let j = lastRow; j >= firstRow; j--) {
            matrix[lastColumn][j] = counter++
        }
        lastColumn--;
        for (let j = lastColumn; j >= firstColumn; j--) {
            matrix[j][firstRow] = counter++
        }
        firstRow++;

    }



    console.log(matrix);




}
spiralMatrix(5, 5)