function triangeArea(a, b, c) {
    const s = (a + b + c) / 2;

    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c))
    console.log(area);
}
triangeArea(2, 3.5, 4);