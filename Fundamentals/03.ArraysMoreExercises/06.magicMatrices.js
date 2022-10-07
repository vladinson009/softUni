function magicMatrices(list) {
    const r = list.length;
    let isMagic = true;
    const sum = list[0].reduce((a, b) => a + b, 0);

    for (let i = 0; i < r; i++) {
        let sumRow = 0;
        let sumColum = 0;
        for (let j = 0; j < r; j++) {
            sumRow += Number(list[i][j]);
            sumColum += Number(list[j][i]);
        }
        sumRow != sum || sumColum != sum ? isMagic = false : isMagic;

    }
    console.log(isMagic);
}
magicMatrices([
    [1, 1, 0],
    [0, 1, 1],
    [1, 0, 1]
]);