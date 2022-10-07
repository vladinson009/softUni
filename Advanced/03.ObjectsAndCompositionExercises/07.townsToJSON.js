function townsToJSON(input) {
    const reg = new RegExp(/[^ | ][A-Za-z\d\s\.]+[^ | $]/, 'g');
    const result = [];
    for (let i = 1; i < input.length; i++) {
        let regex = input[i].match(reg);
        const currentTown = {
            Town: regex[0],
            Latitude: Number(Number(regex[1]).toFixed(2)),
            Longitude: Number(Number(regex[2]).toFixed(2))
        }
        result.push(currentTown);
    }
    console.log(JSON.stringify(result));
}
townsToJSON(['| Town | Latitude | Longitude |',
    '| Veliko Turnovo ovo | 43.0757 | 25.6172 |',
    '| Monatevideo | 34.50 | 56.11 |'
]);