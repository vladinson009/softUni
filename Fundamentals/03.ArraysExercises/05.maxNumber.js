function maxNumber(list) {
    const result = []
    for (let i = 0; i < list.length; i++) {
        let isBigger = true
        const currentNum = list[i];

        for (let j = i; j < list.length - 1; j++) {
            if (currentNum <= list[j + 1]) {
                isBigger = false;
                break;
            }
        }
        if (isBigger) {
            result.push(currentNum);
        }
    }
    console.log(result.join(' '));
}
maxNumber([1, 4, 3, 2]);