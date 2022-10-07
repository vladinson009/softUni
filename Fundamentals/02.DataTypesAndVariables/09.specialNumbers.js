function specialNumbers(n) {
    // A number is special when its sum of digits is 5, 7 or 11.
    for (let i = 1; i <= n; i++) {
        let sum = 0;
        for (num of i.toString()) {
            sum += Number(num);
        }
        if (sum == 5 || sum == 7 || sum == 11) {
            console.log(`${i} -> True`);
        } else {
            console.log(`${i} -> False`);

        }
    }
}
specialNumbers(20);