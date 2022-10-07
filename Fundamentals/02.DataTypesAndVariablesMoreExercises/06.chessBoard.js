function chessBoard(x) {
    let div = '<div class="chessboard">\n';
    let color = '';

    for (let i = 0; i < x; i++) {
        div += '    <div>\n';
        i % 2 == 0 ? color = 'black' : color = 'white';

        for (let j = 0; j < x; j++) {
            div += `        <span class="${color}"></span>\n`
            color == 'black' ? color = 'white' : color = 'black';
        }
        div += '    </div>\n';
    }
    div += '</div>';
    console.log(div);
}
chessBoard(4);