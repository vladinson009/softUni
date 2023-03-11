function argumentInfo(...args) {
    const types = {};

    for (let each of args) {
        console.log(`${typeof each}: ${each}`);
        if (!types.hasOwnProperty(typeof each)) {
            types[typeof each] = 0;
        }
        types[typeof each]++
    }
    let sortedTally = Object.entries(types).sort((a, b) => b[1] - a[1]);
    for (let i = 0; i < sortedTally.length; i++) {
        const [type, num] = sortedTally[i];
        console.log(`${type} = ${num}`);
    }
}

argumentInfo('cat', 42, function () {
    console.log('Hello world!');
})