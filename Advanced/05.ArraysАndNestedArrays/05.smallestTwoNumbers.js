function smallestTwoNumbers(list) {
    const result = list
        .sort((a, b) => a - b)
        .slice(0, 2);

    console.log(result.join(' '));
}
smallestTwoNumbers([30, 15, 50, 5]);