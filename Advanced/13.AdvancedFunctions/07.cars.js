function solution(input) {
    const result = {};
    const action = {
        create: (name, inherit, parentName) => {
            if (inherit === undefined) {
                result[name] = {};
            } else {
                result[name] = Object.create(result[parentName]);
            }
        },
        set: (name, key, value) => {
            result[name][key] = value;
        },
        print: (name) => {
            const printed = []
            for (let key in result[name]) {
                printed.push(`${key}:${result[name][key]}`)
            }
            console.log(printed.join(','));

        }
    }
    for (let storke of input) {
        const [command, ...rest] = storke.split(' ');
        action[command](...rest)
    }
}

solution(['create c1',
    'create c2 inherit c1',
    'set c1 color red',
    'set c2 model new',
    'print c1',
    'print c2'
])