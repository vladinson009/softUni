function lowestPricesInCities(input) {
    const result = {};
    for (const each of input) {
        let [town, product, price] = each.split(' | ');
        price = Number(price);
        if (result[product] == undefined) {
            result[product] = {};
        }
        result[product][town] = price;
    }
    for (let [product, data] of Object.entries(result)) {
        const sortedTown = Object.entries(data).sort((a, b) => a[1] - b[1]);
        const [town, price] = sortedTown[0];
        console.log(`${product} -> ${price} (${town})`);
    }
}
lowestPricesInCities(['Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10'
]);