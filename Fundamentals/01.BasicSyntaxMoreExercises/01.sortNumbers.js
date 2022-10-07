function sortNumbers(first, second, third) {
    const arr = [first, second, third];
    const sortedNumbers = (arr.sort()).reverse().join('\n');
    console.log(sortedNumbers);
}
sortNumbers(-2, 1, 3);