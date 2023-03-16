function listOfNames(list) {
    const result = [];
    const sorted = list.sort((a, b) => a.localeCompare(b))
    for (let i = 0; i < sorted.length; i++) {
        result.push(`${i + 1}.${sorted[i]}`);
    }
    return result.join('\n');

}
console.log(listOfNames(["John", "Bob", "Christina", "Ema"]));