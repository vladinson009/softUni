function mergeArrays(firstList, secondList) {
    const newList = [];
    for (let i = 0; i < firstList.length; i++) {
        const fromFirst = firstList[i];
        const fromSecond = secondList[i];
        if (i % 2 == 0) {
            newList.push(Number(fromFirst) + Number(fromSecond));
        } else {
            newList.push(fromFirst + fromSecond);
        }
    }
    console.log(newList.join(' - '));
}
mergeArrays(['5', '15', '23', '56', '35'],
    ['17', '22', '87', '36', '11']
);