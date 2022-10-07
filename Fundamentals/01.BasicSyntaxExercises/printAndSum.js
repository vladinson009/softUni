function printAndSum(first, last) {
    let numbers = [];
    for (let i = first; i <= last; i++) {
        numbers.push(Number(i));
    }
    let sum = numbers.reduce((a, b) => a + b, 0);
    console.log(numbers.join(' '));
    console.log(`Sum: ${sum}`);
}
printAndSum(5, 10);