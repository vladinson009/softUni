function jansNotation(input) {
    const result = [];
    let noOperands = false;
    for (let current of input) {
        if (typeof current == 'number') {
            result.push(current);
            continue;
        }
        operations(current, result);
        if (noOperands) {
            break;
        }
    }
    if (result.length > 1) {
        console.log('Error: too many operands!');
    } else if (noOperands) {
        console.log('Error: not enough operands!');
    } else {
        console.log(result[0])
    }

    function operations(string, source) {
        if (source.length > 1) {
            const second = source.pop();
            const first = source.pop();
            if (string == '+') {
                source.push(first + second);
            } else if (string == '-') {
                source.push(first - second);
            } else if (string == '/') {
                source.push(first / second);
            } else if (string == '*') {
                source.push(first * second);
            }
        } else {
            return noOperands = true;
        }
    }

}
jansNotation([15,
    '/'
]);