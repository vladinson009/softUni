function orbit(arr) {
    const r = arr[0];
    const c = arr[1];
    const x = arr[2];
    const y = arr[3];
    const matrix = [];
    for (let i = 0; i < r; i++) {
        matrix.push([]);
        for (let k = 0; k < c; k++) {
            matrix[i].push(false);
        }
    }
    for (let i = 0; i < r; i++) {
        for (let k = 0; k < c; k++) {
            matrix[i][k] = Math.max(Math.abs(x - i), Math.abs(y - k)) + 1;
        }

    }
    console.log(matrix.map(el => el.join(" ")).join("\n"));
}
orbit([4, 4, 1, 1]);