function lastDigitName(num) {
    let digitName = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', ];
    let lastDigitString = num.toString()[num.toString().length - 1];

    console.log(digitName[lastDigitString]);

}
lastDigitName(51256789);