function maxSequence(list) {
    let result = [];
    for (let i = 0; i < list.length - 1; i++) {
        const sequence = [];
        sequence.push(list[i]);
        for (let j = i + 1; j < list.length; j++) {
            if (sequence[0] == list[j]) {
                sequence.push(list[j]);
            } else {
                break;
            }
        }
        if (sequence.length > result.length) {
            result = sequence;
        }

    }
    console.log(result.join(' '));
}
// maxSequence([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);
// maxSequence([1, 1, 1, 2, 3, 1, 3, 3]);
maxSequence([0, 1, 1, 5, 2, 2, 6, 3, 3, 3]);

function demo(list) {
    let topPrintLine = []
    for (let i = 0; i < list.length; i++) {
        let printLine = [];
        for (let j = 0; j < list.length; j++) {
            if (list[i] === list[j + i]) {
                printLine.push(list[i])
            } else {
                break
            }
        }
        if (printLine.length > topPrintLine.length) {
            topPrintLine = printLine
        }
    }
    console.log(topPrintLine.join(' '));
}
//demo([0, 1, 1, 5, 2, 2, 6, 3, 3, 3])