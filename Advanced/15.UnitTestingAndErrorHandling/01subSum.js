function sumNum(array, startIndex, endIndex) {
    let sum = 0;
    if (startIndex < 0) {
        startIndex = 0;
    }
    if (endIndex > array.length - 1) {
        endIndex = array.length - 1;
    }
    if (Array.isArray(array == false)) {
        return NaN
    }
    try {

        for (let i = startIndex; i <= endIndex; i++) {
            let num = array[i];
            if (typeof num != 'number') {
                throw new Error('Not a number')
            }
            sum += num;
        }
    } catch (error) {
        return NaN;

    }

    return sum;
}

console.log(sumNum([10, 20, 30, 40, 50, 60], 3, 300));
console.log(sumNum([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1));
console.log(sumNum([10, 'twenty', 30, 40], 0, 2));
console.log(sumNum([], 1, 2));
console.log(sumNum('text', 0, 2));