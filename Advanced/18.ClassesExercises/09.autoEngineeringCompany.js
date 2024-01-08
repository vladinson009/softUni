function autoEngineeringCompany(input) {
  const cars = input.reduce((acc, current) => {
    let [brand, model, amount] = current.split(" | ");
    amount = Number(amount);

    if (acc[brand] == undefined) {
      acc[brand] = {};
    }
    if (acc[brand][model] == undefined) {
      acc[brand][model] = 0;
    }
    acc[brand][model] += amount;
    return acc;
  }, {});
  for (let brand in cars) {
    console.log(brand);
    for (const [model, amount] of Object.entries(cars[brand])) {
      console.log(`###${model} -> ${amount}`);
    }
  }
}

autoEngineeringCompany([
  "Audi | Q7 | 1000",
  "Audi | Q6 | 100",
  "BMW | X5 | 1000",
  "BMW | X6 | 100",
  "Citroen | C4 | 123",
  "Volga | GAZ-24 | 1000000",
  "Lada | Niva | 1000000",
  "Lada | Jigula | 1000000",
  "Citroen | C4 | 22",
  "Citroen | C5 | 10",
]);
