function spiralMatrix(x, y) {
    let counter = 1;
    let startCol = 0;
    let endCol = y - 1;
    let startRow = 0;
    let endRow = x - 1;
    const result = [];

    for (let i = 0; i < x; i++) {
        let row = []
        for (let j = 0; j < y; j++) {
            row.push(undefined)
        }
        result.push(row)
    }
    //////////////////////////////
    while (startCol <= endCol && startRow <= endRow) {

        for (let i = startCol; i <= endCol; i++) {
            result[startRow][i] = counter;
            counter++;
        }
        startRow++;
        for (let j = startRow; j <= endRow; j++) {
            result[j][endCol] = counter;
            counter++;
        }

        endCol--;

        for (let i = endCol; i >= startCol; i--) {
            result[endRow][i] = counter;
            counter++;
        }

        endRow--;
        for (let i = endRow; i >= startRow; i--) {
            result[i][startCol] = counter;
            counter++;
        }

        startCol++;

    }

    for (let row of result) {
        console.log(row.join(' '));
    }

}
spiralMatrix(5, 5);