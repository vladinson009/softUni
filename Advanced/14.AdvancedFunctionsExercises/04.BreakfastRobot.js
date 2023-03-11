function solution() {
    const microelements = {
        protein: 0,
        carbohydrate: 0,
        fat: 0,
        flavour: 0
    }
    const recipes = {
        apple: {
            carbohydrate: 1,
            flavour: 2
        },
        lemonade: {
            carbohydrate: 10,
            flavour: 20
        },
        burger: {
            carbohydrate: 5,
            fat: 7,
            flavour: 3
        },
        eggs: {
            protein: 5,
            fat: 1,
            flavour: 1
        },
        turkey: {
            protein: 10,
            carbohydrate: 10,
            fat: 10,
            flavour: 10
        }
    };

    function restock(microel, qty) {
        microelements[microel] += Number(qty);
        return 'Success';
    }

    function prepare(recipe, qty) {
        const remainingElements = {};
        for (const element in recipes[recipe]) {
            const elementsCosts = Number(recipes[recipe][element]) * Number(qty);
            const remaining = microelements[element] - elementsCosts;
            if (remaining < 0) {
                return `Error: not enough ${element} in stock`;
            } else {
                remainingElements[element] = remaining;
            }
        }
        Object.assign(microelements, remainingElements)
        return 'Success';
    }

    function report() {
        const result = [];
        for (let el in microelements) {
            result.push(`${el}=${microelements[el]}`)
        }
        return result.join(' ');
    }
    return (str) => {
        const [func, item, qty] = str.split(' ');
        if (func == 'restock') {
            return restock(item, qty);
        } else if (func == 'prepare') {
            return prepare(item, qty);
        } else if (func == 'report') {
            return report();
        }
    };
}

let manager = solution();
// console.log(manager("restock flavour 50")); // Success 
// console.log(manager("prepare lemonade 4")); // Error: not enough carbohydrate in stock 
console.log(manager('restock flavour 50'));
console.log(manager('prepare lemonade 4'));
console.log(manager('restock carbohydrate 10'));
console.log(manager('restock flavour 10'));
console.log(manager('prepare apple 1'));
console.log(manager('restock fat 10'));
console.log(manager('prepare burger 1'));
console.log(manager('report'));