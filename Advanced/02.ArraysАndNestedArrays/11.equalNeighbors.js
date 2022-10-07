function equalNeighbors(input) {
    let counter = 0;
    for (let i = 0; i < input.length; i++) {

        for (let j = 0; j < input[0].length; j++) {
            const el = input[i][j];
            const nextEl = input[i][j + 1];

            if (el == nextEl) {
                counter++;
            }
            if (i != input.length - 1 && el == input[i + 1][j]) {
                counter++
            }
        }
    }
    return counter;
}
console.log(equalNeighbors([
    ['2', '2', '5', '7', '4'],
    ['4', '0', '5', '3', '4'],
    ['2', '5', '5', '4', '2']
]));;