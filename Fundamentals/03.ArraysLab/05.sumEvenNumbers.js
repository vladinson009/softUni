function sumEvenNumbers(arr) {
    let sum = 0;
    for (let i of arr) {
        if (Number(i) % 2 == 0) {
            sum += Number(i);
        }
    }
    console.log(sum);
}
sumEvenNumbers(['2', '4', '6', '8', '10']);