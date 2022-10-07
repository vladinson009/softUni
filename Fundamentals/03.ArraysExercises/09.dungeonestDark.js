function dungeonestDark(input) {
    let isAlive = true;
    let health = 100;
    let coins = 0;
    const action = {
        potion,
        chest,
    }
    const rooms = input[0].split('|');
    for (let i = 0; i < rooms.length; i++) {
        [itemOrMonster, amount] = rooms[i].split(' ');

        amount = Number(amount);
        if (itemOrMonster == 'potion' || itemOrMonster == 'chest') {
            action[itemOrMonster](amount);
        } else {
            health -= amount;
            if (health > 0) {
                console.log(`You slayed ${itemOrMonster}.`);
            } else {
                console.log(`You died! Killed by ${itemOrMonster}.`);
                console.log(`Best room: ${i + 1}`);
                isAlive = false;
                break;
            }
        }
    }
    if (isAlive) {
        console.log('You\'ve made it!');
        console.log(`Coins: ${coins}`);
        console.log(`Health: ${health}`);
    }

    function potion(amount) {
        if (amount + health > 100) {
            amount = 100 - health;
        }
        health += amount;
        console.log(`You healed for ${amount} hp.`);
        console.log(`Current health: ${health} hp.`);
    }

    function chest(amount) {
        coins += amount;
        console.log(`You found ${amount} coins.`);
    }
}
dungeonestDark(["cat 10|potion 30|orc 10|chest 10|snake 25|chest 110"]);