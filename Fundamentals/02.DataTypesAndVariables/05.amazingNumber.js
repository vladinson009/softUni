function amazingNumber(input) {
    let result = 'False';
    let sum = input
        .toString()
        .split('')
        .reduce((a, b) => Number(a) + Number(b), 0)
        .toString();

    sum.includes('9') ? result = 'True' : sum;

    console.log(`${input} Amazing? ${result}`);
};
amazingNumber(999);