function commonElements(firstList, secondList) {

    for (let i = 0; i < firstList.length; i++) {
        const firstEl = firstList[i];

        for (let j = 0; j < secondList.length; j++) {
            const secondEl = secondList[j];
            if (firstEl === secondEl) {
                console.log(firstEl);
            }
        }
    }
}
commonElements(['Hey', 'hello', 2, 4, 'Peter', 'e'],
    ['Petar', 10, 'hey', 4, 'hello', '2']);