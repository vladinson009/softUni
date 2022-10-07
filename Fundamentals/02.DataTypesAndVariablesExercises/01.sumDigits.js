function sumDigits(digit) {
    let result = 0;
    const num = digit.toString();

    for (const i of num) {
        result += Number(i);
    }
    console.log(result);

}
sumDigits(543);