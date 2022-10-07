function triangeOfNumbers(num) {
    for (let i = 1; i <= num; i++) {
        const arr = [];
        for (let j = 1; j <= i; j++) {
            arr.push(i)
        }
        console.log(arr.join(' '));
    }
}
triangeOfNumbers(6);