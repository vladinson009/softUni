function reverseArray(n, arr) {
    let newArr = arr.slice(0, n).reverse().join(' ');
    console.log(newArr);
}
//reverseArray(3, [10, 20, 30, 40, 50]);
/////////////////////////////////////////////////////////////////////////////

function reverseAnArrayOfNumbers(n, array) {
    let newArrawy = [];
    for (let i = 0; i < n; i++) {
        newArrawy[i] = array[i];

    }

    for (let j = 0; j < newArrawy.length / 2; j++) {
        let temp = newArrawy[(newArrawy.length - 1) - j];
        newArrawy[(newArrawy.length - 1) - j] = newArrawy[j]
        newArrawy[j] = temp
    }
    console.log(newArrawy.join(' '));
}
reverseAnArrayOfNumbers(4, [-1, 20, 99, 5])