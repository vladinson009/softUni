function solution(input) {
    const result = [];
    const obj = {
        add: (str) => {
            result.push(str)
        },
        remove: (str) => {
            while (result.indexOf(str) != -1)
                result.splice(result.indexOf(str), 1)
        },
        print: () => {
            console.log(result.join(','))
        },
    };

    for (let i = 0; i < input.length; i++) {
        const [command, text] = input[i].split(' ');
        obj[command](text);
    }
}

solution(['add hello', 'add hello', 'add hello', 'add again', 'remove hello', 'add again', 'remove again', 'print']);