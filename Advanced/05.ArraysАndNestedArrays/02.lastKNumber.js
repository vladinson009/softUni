function lastKNumber(n, k) {
    const result = [];
    for (let i = 0; i < n; i++) {
        result.length == 0 ? result.push(1) :
            result.push(result
                .slice(-k)
                .reduce((a, b) => a + b, 0))
    }
    return result;
}
console.log(lastKNumber(6, 3));