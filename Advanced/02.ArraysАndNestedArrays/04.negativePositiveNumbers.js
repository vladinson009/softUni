function negativePositiveNumbers(list) {
    const result = [];
    for (let num of list) {
        num < 0 ? result.unshift(num) : result.push(num);
    }
    return result.join('\n');
}
console.log(negativePositiveNumbers([7, -2, 8, 9]));