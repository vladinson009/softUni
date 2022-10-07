function lowerOrUpper(string) {
    let result = '';
    if (string == string.toUpperCase()) {
        result = 'upper-case';
    } else {
        result = 'lower-case';
    }
    console.log(result);
}
lowerOrUpper('A');