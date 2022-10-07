function rotateArray(list) {
    let rotation = Number(list.pop()) % list.length;
    for (let i = 0; i < rotation; i++) {
        list.unshift(list.pop());
    }
    console.log(list.join(' '));
}
rotateArray(['Banana', 'Orange', 'Coconut', 'Apple', '15']);