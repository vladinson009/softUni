function solve(array, arg) {
    if (arg == 'asc') {
        array = array.sort((a, b) => a - b);
    } else if (arg == 'desc') {
        array = array.sort((a, b) => b - a);
    }
    return array;
}

solve();