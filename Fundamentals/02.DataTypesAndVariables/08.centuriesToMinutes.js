function centuriesToMinutes(centuries) {
    //1 centuries = 100 years = 36524 days = 876576 hours = 52594560 minutes
    const years = centuries * 100;
    const days = Math.trunc(years * 365.2422);
    const hours = days * 24;
    const minutes = hours * 60;

    console.log(`${centuries} centuries = ${years} years = ${days} days = ${hours} hours = ${minutes} minutes`);

}
centuriesToMinutes(5);