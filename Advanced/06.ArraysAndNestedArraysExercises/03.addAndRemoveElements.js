function addOrRemove(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        arr[i] == 'add' ? result.push(i + 1) : result.pop();
    }
    result.length < 1 ? console.log('Empty') :
        console.log(result.join('\n'));
}
addOrRemove(['remove',
    'remove',
    'remove'
]);