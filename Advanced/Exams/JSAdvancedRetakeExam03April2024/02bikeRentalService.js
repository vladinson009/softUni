class BikeRentalService {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.availableBikes = [];
  }
  addBikes(bikes) {
    const bikeSet = new Set();
    for (const bike of bikes) {
      let [brand, quantity, price] = bike.split('-');
      quantity = Number(quantity);
      price = Number(price);
      const existingBike = this.availableBikes.find((b) => b.brand == brand);
      if (existingBike) {
        existingBike.quantity += quantity;
        if (price > existingBike.price) {
          existingBike.price = price;
        }
      } else {
        this.availableBikes.push({ brand, quantity, price });
        bikeSet.add(brand);
      }
    }
    return `Successfully added ${Array.from(bikeSet).join(', ')}`;
  }
  rentBikes(selectedBikes) {
    let totalPrice = 0;
    let notAvailable = false;
    for (const bike of selectedBikes) {
      let [brand, quantity] = bike.split('-');
      quantity = Number(quantity);
      const existingBike = this.availableBikes.find((b) => b.brand == brand);
      if (existingBike && existingBike.quantity >= quantity) {
        existingBike.quantity -= quantity;
        totalPrice += existingBike.price * quantity;
      } else {
        notAvailable = true;
      }
    }
    if (notAvailable) {
      return 'Some of the bikes are unavailable or low on quantity in the bike rental service.';
    } else {
      return `Enjoy your ride! You must pay the following amount $${totalPrice.toFixed(
        2
      )}.`;
    }
  }
  returnBikes(returnedBikes) {
    let notAvailable = false;
    for (const bike of returnedBikes) {
      let [brand, quantity] = bike.split('-');
      quantity = Number(quantity);
      let existingBike = this.availableBikes.find((b) => b.brand == brand);
      if (existingBike) {
        existingBike.quantity += quantity;
      } else {
        notAvailable = true;
      }
    }
    if (notAvailable) {
      return 'Some of the returned bikes are not from our selection.';
    } else {
      return 'Thank you for returning!';
    }
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
