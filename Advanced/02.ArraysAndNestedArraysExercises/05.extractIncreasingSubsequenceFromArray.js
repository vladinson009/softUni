function increasingSub(arr) {
    let biggestNum = Number.MIN_SAFE_INTEGER;
    const result = [];
    arr.reduce((a, b) => {
        if (b >= biggestNum) {
            biggestNum = b;
            a.push(b);
        }
        return a
    }, result)
    return result
}
console.log(increasingSub([1,
    3,
    8,
    4,
    10,
    12,
    3,
    2,
    24
]));