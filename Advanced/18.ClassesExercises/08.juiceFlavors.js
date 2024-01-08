function fuiceFlavors(input) {
  const juices = new Map();

  input.reduce((acc, current) => {
    let [juice, qty] = current.split(" => ");
    qty = Number(qty);

    acc.hasOwnProperty(juice) ? (acc[juice] += qty) : (acc[juice] = qty);

    if (acc[juice] >= 1000) {
      juices.get(juice) == undefined ? juices.set(juice, 0) : juices;
      juices.set(juice, juices.get(juice) + Math.floor(acc[juice] / 1000));
      acc[juice] %= 1000;
    }
    return acc;
  }, {});
  juices.forEach((value, key) => console.log(`${key} => ${value}`));
}

fuiceFlavors([
  "Kiwi => 234",
  "Pear => 2345",
  "Watermelon => 3456",
  "Kiwi => 4567",
  "Pear => 5678",
  "Watermelon => 6789",
]);
