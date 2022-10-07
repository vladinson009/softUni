function integerAndFloat(a, b, c) {
    let sum = a + b + c;
    let type = ''
    if (sum == Math.round(sum)) {
        type = 'Integer'
    } else {
        type = 'Float'
    }
    console.log(`${sum} - ${type}`);
}
integerAndFloat(9, 100, 1)