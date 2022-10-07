function rightPlace(firstString, char, secondString) {
    let text = '';
    for (let i of firstString) {
        if (i != '_') {
            text += i;
        } else {
            text += char;
        }
    }
    text == secondString ? console.log('Matched') : console.log('Not Matched');
};
///////////////////////////////////
function rightPlace2(firstString, char, secondString) {
    let text = firstString.replace('_', char)

    text == secondString ? console.log('Matched') : console.log('Not Matched');
};
rightPlace2('Str_ng', 'i', 'String')