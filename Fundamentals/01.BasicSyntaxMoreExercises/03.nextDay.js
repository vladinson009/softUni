function nextDay(year, month, day) {

    let thisDay = new Date(year, month - 1, day + 1);

    let newDay = thisDay.getDate();
    let newMonth = thisDay.getMonth();
    let newYear = thisDay.getFullYear();

    console.log(`${newYear}-${newMonth+1}-${newDay}`);
};
nextDay(2016, 9, 30);