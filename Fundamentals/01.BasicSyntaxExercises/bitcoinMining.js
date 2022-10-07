function bitcoinMining(arr) {
    let bitcoins = 0;
    let cash = 0
    let dayFirstBtc = 0;

    for (let i = 1; i <= arr.length; i++) {
        let dailyDigging = arr[i - 1];
        if (i % 3 == 0) {
            cash += dailyDigging * 67.51 * 0.7
        } else {
            cash += dailyDigging * 67.51;
        }

        while (cash >= 11949.16) {
            bitcoins++;
            if (bitcoins == 1) {
                dayFirstBtc = i;
            }
            cash -= 11949.16;
        }
    }
    console.log(`Bought bitcoins: ${bitcoins}`);
    if (bitcoins != 0) {
        console.log(`Day of the first purchased bitcoin: ${dayFirstBtc}`);
    }
    console.log(`Left money: ${cash.toFixed(2)} lv.`);
}

bitcoinMining([3124.15, 504.212, 2511.124]);