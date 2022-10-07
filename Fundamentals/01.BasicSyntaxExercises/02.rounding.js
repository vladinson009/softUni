function rounding(num, decimal) {
    if (decimal > 15) {
        decimal = 15;
    }
    let result = parseFloat(num.toFixed(decimal));
    console.log(result);
}
rounding(3.1415926535897932384626433832795, 22)