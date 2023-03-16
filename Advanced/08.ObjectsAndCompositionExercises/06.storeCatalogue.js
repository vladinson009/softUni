function storeCatalogue(input) {
    const catalogue = {};
    for (let each of input) {
        let [product, price] = each.split(' : ');
        price = Number(price);
        let idx = product[0];
        if (catalogue[idx] == undefined) {
            catalogue[idx] = {};
        }
        catalogue[idx][product] = price;
    }
    const sortedCatalogue = Object.keys(catalogue).sort();
    for (let index of sortedCatalogue) {
        console.log(index);
        const items = Object.entries(catalogue[index])
            .sort()
            .forEach(el => console.log(`  ${el.join(': ')}`));

    }

}
storeCatalogue(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'
]);