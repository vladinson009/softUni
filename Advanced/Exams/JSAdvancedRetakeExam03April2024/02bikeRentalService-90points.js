class BikeRentalService {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.availableBikes = [];
  }
  addBikes(bikes) {
    const uniqueSet = new Set();
    for (const bike of bikes) {
      let [brand, quantity, price] = bike.split('-');
      quantity = Number(quantity);
      price = Number(price);
      const existingBikes = this.availableBikes.find((b) => b.brand == brand);
      if (existingBikes) {
        existingBikes.quantity += quantity;
        if (price > existingBikes.price) {
          existingBikes.price = price;
        }
      } else {
        this.availableBikes.push({ brand, quantity, price });
      }
      uniqueSet.add(brand);
    }
    return `Successfully added ${Array.from(uniqueSet).join(', ')}`;
  }
  rentBikes(selectedBikes) {
    let totalPrice = 0;

    for (const bike of selectedBikes) {
      let [brand, quantity] = bike.split('-');
      quantity = Number(quantity);
      let existingBikes = this.availableBikes.find((b) => b.brand == brand);
      if (existingBikes == undefined || existingBikes.quantity < quantity) {
        return `Some of the bikes are unavailable or low on quantity in the bike rental service.`;
      } else {
        totalPrice += existingBikes.price * quantity;
        existingBikes.quantity -= quantity;
      }
    }
    ////////

    ///////
    return `Enjoy your ride! You must pay the following amount $${totalPrice.toFixed(
      2
    )}.`;
  }
  returnBikes(returnedBikes) {
    for (const bike of returnedBikes) {
      let [brand, quantity] = bike.split('-');
      quantity = Number(quantity);
      let existingBikes = this.availableBikes.find((b) => b.brand == brand);
      if (existingBikes == undefined) {
        return 'Some of the returned bikes are not from our selection.';
      } else {
        existingBikes.quantity += quantity;
      }
    }
    return 'Thank you for returning!';
  }
  revision() {
    let result = 'Available bikes:\n';
    const sortedBikes = this.availableBikes.sort((a, b) => a.price - b.price);
    for (const bike of sortedBikes) {
      result += `${bike.brand} quantity:${bike.quantity} price:$${bike.price}\n`;
    }
    result += `The name of the bike rental service is ${this.name}, and the location is ${this.location}.`;
    return result;
  }
}
const rentalService = new BikeRentalService('MyBikes', 'CityCenter');

console.log(
  rentalService.addBikes([
    'Mountain Bike-5-150',
    'City Bike-10-100',
    'Electric Bike-3-200',
    'Electric Bike-8-400',
  ])
);
console.log(rentalService.rentBikes(['Mountain Bike-5', 'City Bike-5']));
console.log(rentalService.returnBikes(['Mountain Bike-1', 'City Bike-3']));
console.log(rentalService.revision());
