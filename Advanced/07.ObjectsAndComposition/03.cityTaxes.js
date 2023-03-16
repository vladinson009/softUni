function cityTaxes(name, population, treasury) {
    const register = {
        name,
        population,
        treasury,
        taxRate: 10,
        collectTaxes,
        applyGrowth,
        applyRecession
    }
    return register;

    function collectTaxes() {
        return this.treasury += Math.floor(this.population * this.taxRate);
    }

    function applyGrowth(percentage) {
        return this.population += Math.floor(this.population * Number(percentage) / 100);
    }

    function applyRecession(percentage) {
        return this.treasury -= Math.ceil(this.treasury * Number(percentage) / 100);
    }
}
const city =
    cityTaxes('Tortuga',
        7000,
        15000);
city.collectTaxes();
console.log(city.treasury);
city.applyGrowth(5);
console.log(city.population);