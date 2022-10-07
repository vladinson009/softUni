function kingDjoser(base, increment) {
    let stone = 0;
    let marble = 0;
    let lapis = 0;
    let gold = 0;
    let height = 0;
    let counter = 1;
    for (let i = base; i >= 1; i -= 2) {
        height += increment;
        if (i <= 2) {
            gold = i * i * increment;
            break;
        } else {
            stone = stone + (i - 2) * (i - 2) * increment;
        }

        if (counter % 5 == 0) {
            lapis = lapis + (i * 4 - 4) * increment;
        } else if (counter % 5 != 0) {
            marble = marble + (i * 4 - 4) * increment;
        }
        counter++;
    }
    console.log(`Stone required: ${Math.ceil(stone)}`);
    console.log(`Marble required: ${Math.ceil(marble)}`);
    console.log(`Lapis Lazuli required: ${Math.ceil(lapis)}`);
    console.log(`Gold required: ${Math.ceil(gold)}`);
    console.log(`Final pyramid height: ${Math.floor(height)}`);
}
kingDjoser(11,
    0.75);