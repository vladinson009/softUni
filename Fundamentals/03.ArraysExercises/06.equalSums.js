function equalSums(list) {
    let notEqual = true;

    for (let i = 0; i < list.length; i++) {
        let leftSum = 0;
        let rightSum = 0;

        for (let leftIdx = 0; leftIdx < i; leftIdx++) {
            leftSum += list[leftIdx];
        }
        for (let rightIdx = i + 1; rightIdx < list.length; rightIdx++) {
            rightSum += list[rightIdx];
        }
        if (leftSum === rightSum) {
            notEqual = false
            console.log(i);
            break;
        }
    }
    if (notEqual) {
        console.log('no');
    }
}
equalSums([1, 2, 3, 3, 5]);