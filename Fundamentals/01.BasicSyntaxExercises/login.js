function login(arr) {
    let username = arr.shift();
    let password = username.split('').reverse().join('');

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] != password) {

            if (i == 3) {
                console.log(`User ${username} blocked!`);
                break;
            }
            console.log('Incorrect password. Try again.');

        } else {
            console.log(`User ${username} logged in.`);
            break;
        }
    }
}
login(['Acer', 'login', 'go', 'let me in', 'recA']);