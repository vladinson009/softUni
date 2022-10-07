function tripplesOfLatinLetters(num) {
    num = Number(num);
    for (let i = 0; i < num; i++) {
        for (let j = 0; j < num; j++) {
            for (let k = 0; k < num; k++) {
                const firstLetter = String.fromCharCode(97 + i);
                const secondLetter = String.fromCharCode(97 + j);
                const thirdLetter = String.fromCharCode(97 + k);
                console.log(firstLetter + secondLetter + thirdLetter);
            }
        }
    }

}
tripplesOfLatinLetters('3');