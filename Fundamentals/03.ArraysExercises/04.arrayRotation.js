function arrayRotation(arr, rotation) {

    for (let i = 0; i < rotation; i++) {
        const first = arr[0];
        for (let j = 0; j < arr.length - 1; j++) {
            arr[j] = arr[j + 1]
        }
        arr[arr.length - 1] = first;
    }
    console.log(arr.join(' '));
}
arrayRotation([51, 47, 32, 61, 21], 2);

function demo(arr, rotation) {
    for (let i = 0; i < rotation; i++) {
        arr.push(arr.shift());
    }
    console.log(arr.join(' '));
}
demo([51, 47, 32, 61, 21], 2);