function spiceMustFlow(startingYield) {
    let totalYield = 0;
    let totalDays = 0;

    while (startingYield >= 100) {
        totalDays++;
        totalYield += startingYield;

        if (totalYield > 26) {
            totalYield -= 26;
        } else {
            totalYield = 0;
        }

        startingYield -= 10;
    }
    if (totalYield > 26) {
        totalYield -= 26;
    } else {
        totalYield = 0;
    }
    console.log(totalDays + '\n' + totalYield);
}
spiceMustFlow(450);