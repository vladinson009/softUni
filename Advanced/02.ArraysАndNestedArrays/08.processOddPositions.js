function processOddPositions(list) {
    return list.filter((v, i) => i % 2 != 0)
        .map(x => x * 2)
        .reverse()
        .join(' ');
};
console.log(processOddPositions([10, 15, 20, 25]));