function biggerHalf(list) {
    const biggerHalf = Math.floor(list.length / 2);
    const result = list
        .sort((a, b) => a - b)
        .slice(biggerHalf);
    return result

}
biggerHalf([3, 19, 14, 7, 2, 19, 6]);