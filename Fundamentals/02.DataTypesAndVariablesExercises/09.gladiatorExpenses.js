function gladiatorExpenses(lostFights, helmetPrice, swordPrice, shieldPrice, armourPrice) {
    let expenses = 0;
    for (let i = 1; i <= lostFights; i++) {
        if (i % 2 == 0) {
            expenses += helmetPrice;
        }
        if (i % 3 == 0) {
            expenses += swordPrice;
        }
        if (i % 2 == 0 && i % 3 == 0) {
            expenses += shieldPrice;
        }
        if (i % 12 == 0) {
            expenses += armourPrice;
        }
    }
    console.log(`Gladiator expenses: ${expenses.toFixed(2)} aureus`);
}
gladiatorExpenses(23,
    12.50,
    21.50,
    40,
    200);