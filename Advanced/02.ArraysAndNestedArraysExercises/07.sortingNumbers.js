function sortingNumbers(arr) {
    const result = [];
    const sorted = arr.sort((a, b) => a - b);

    while (sorted.length > 0) {
        result.push(sorted.shift(), sorted.pop())
    }
    return result
}
console.log(sortingNumbers([1, 65, 3, 52, 48, 63, 31, -3, 18, 56]));