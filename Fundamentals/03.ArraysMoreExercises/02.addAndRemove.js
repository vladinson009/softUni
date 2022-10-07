function addAndRemove(list) {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i] == 'add') {
            result.push(i + 1)
        } else if (list[i] == 'remove') {
            result.pop()
        }
    }
    if (result.length > 0) {
        console.log(result.join(' '));
    } else {
        console.log('Empty');
    }
}
addAndRemove(['remove', 'remove', 'remove']);