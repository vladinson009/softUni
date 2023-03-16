function rotateArray(arr, rotations) {
    const r = rotations % arr.length;
    for (let i = 0; i < r; i++) {
        arr.unshift(arr.pop());
    }
    return arr.join(' ');
}
rotateArray(['1',
        '2',
        '3',
        '4'
    ],
    2);