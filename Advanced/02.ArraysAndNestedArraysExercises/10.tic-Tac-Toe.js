function ticTacToe(arr) {
    const board = [
        [false, false, false],
        [false, false, false],
        [false, false, false]
    ];
    let player = 'X';

    for (let i = 0; i < arr.length; i++) {
        const [x, y] = arr[i].split(' ');
        if (board[x][y] == false) {
            board[x][y] = player;
            player == 'X' ? player = 'O' : player = 'X';
        } else {
            console.log('This place is already taken. Please choose another!');
        }
        if (hasWin() || isBoardFull()) {
            break;
        }
    }
    for (let each of board) {
        console.log(each.join('\t'));
    }

    function hasWin() {
        let firstDiag = '';
        let secondDiag = '';
        let row = '';
        let col = '';
        for (let i = 0; i < board.length; i++) {
            firstDiag += board[i][i];
            secondDiag += board[i][board.length - 1 - i];
            for (let k = 0; k < board.length; k++) {
                row += board[i][k];
                col += board[k][i];
            }
            if (firstDiag == 'XXX' || secondDiag == 'XXX' ||
                row == 'XXX' || col == 'XXX') {
                console.log('Player X wins!');
                return true;
            } else if (firstDiag == 'OOO' || secondDiag == 'OOO' ||
                row == 'OOO' || col == 'OOO') {
                console.log('Player O wins!');
                return true;
            }
        }
    }

    function isBoardFull() {
        let isFull = true;
        for (let i = 0; i < board.length; i++) {
            for (let k = 0; k < board.length; k++) {
                if (board[i][k] == false) {
                    isFull = false;
                    break;
                }
            }
        }
        if (isFull) {
            console.log('The game ended! Nobody wins :(');
            return true;
        }
    }

}
ticTacToe(["0 1",
    "0 0",
    "0 2",
    "2 0",
    "1 0",
    "1 2",
    "1 1",
    "2 1",
    "2 2",
    "0 0"
]);