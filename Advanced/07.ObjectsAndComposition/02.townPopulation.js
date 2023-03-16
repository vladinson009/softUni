function townPopulation(list) {
    const register = {};
    list.forEach(element => {
        let [city, population] = element.split(' <-> ');
        population = Number(population);
        if (register.hasOwnProperty(city)) {
            register[city] += population;
        } else {
            register[city] = population;
        }
    });
    for (const [town, pop] of Object.entries(register)) {
        console.log(`${town} : ${pop}`);

    }
}
townPopulation(['Istanbul <-> 100000',
    'Honk Kong <-> 2100004',
    'Jerusalem <-> 2352344',
    'Mexico City <-> 23401925',
    'Istanbul <-> 1000'
]);