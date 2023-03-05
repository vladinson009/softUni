function solve(area, vol, input) {
    const data = JSON.parse(input);
    const result = [];

    for (let el of data) {
        const areaData = area.apply(el);
        const volData = vol.apply(el);
        result.push({
            area: areaData,
            volume: volData
        });
    }
    return result;
}

console.log(solve(area, vol, `[
{"x":"1","y":"2","z":"10"},
{"x":"7","y":"7","z":"10"},
{"x":"5","y":"2","z":"10"}
]`));


function area() {
    return Math.abs(this.x * this.y);
};

function vol() {
    return Math.abs(this.x * this.y * this.z);
};