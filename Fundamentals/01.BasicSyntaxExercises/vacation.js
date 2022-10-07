function vacation(peopleAmount, groupType, dayOfWeek) {
    let totalPrice = 0;
    if (groupType == 'Students') {
        if (dayOfWeek == 'Friday') {
            totalPrice = peopleAmount * 8.45;
        } else if (dayOfWeek == 'Saturday') {
            totalPrice = peopleAmount * 9.80;
        } else if (dayOfWeek == 'Sunday') {
            totalPrice = peopleAmount * 10.46;
        }
        if (peopleAmount >= 30) {
            totalPrice = totalPrice * 0.85;
        }

    } else if (groupType == 'Business') {
        if (peopleAmount >= 100) {
            peopleAmount -= 10;
        }
        if (dayOfWeek == 'Friday') {
            totalPrice = peopleAmount * 10.90;
        } else if (dayOfWeek == 'Saturday') {
            totalPrice = peopleAmount * 15.60;
        } else if (dayOfWeek == 'Sunday') {
            totalPrice = peopleAmount * 16;
        }

    } else if (groupType == 'Regular') {
        if (dayOfWeek == 'Friday') {
            totalPrice = peopleAmount * 15;
        } else if (dayOfWeek == 'Saturday') {
            totalPrice = peopleAmount * 20;
        } else if (dayOfWeek == 'Sunday') {
            totalPrice = peopleAmount * 22.50;
        }
        if (peopleAmount >= 10 && peopleAmount <= 20) {
            totalPrice = totalPrice * 0.95;
        }
    }
    totalPrice = totalPrice.toFixed(2);
    return `Total price: ${totalPrice}`;
}
console.log(vacation(40, "Regular", "Sunday"));