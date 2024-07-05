class FashionRetailInventory {
  constructor(storehouse, location, productStock = []) {
    this.storehouse = storehouse;
    this.location = location;
    this.productStock = productStock;
  }
  addProduct(productName, size, quantity, price) {
    const existingProduct = this.productStock.find(
      (product) => product.size == size && product.productName == productName
    );
    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
      return `You added ${quantity} more pieces of product ${productName} size ${size}`;
    } else {
      this.productStock.push({ productName, size, quantity, price });
      return `The product ${productName}, size ${size} was successfully added to the inventory`;
    }
  }
  sendProduct(productName, size) {
    const indexOfProduct = this.productStock.findIndex(
      (product) => product.productName == productName && product.size == size
    );
    if (indexOfProduct == -1) {
      throw new Error(
        `The product ${productName}, size ${size} is not in the inventory`
      );
    }
    this.productStock.splice(indexOfProduct, 1);
    return `The product ${productName}, size ${size} was successfully removed from the inventory`;
  }
  findProductsBySize(size) {
    const matchedSize = this.productStock.filter(
      (product) => product.size == size
    );
    if (matchedSize.length < 1) {
      return `There are no products available in that size`;
    }
    return matchedSize
      .map((product) => `${product.productName}-${product.quantity} pieces`)
      .join(', ');
  }
  listProducts() {
    if (this.productStock.length < 1) {
      return `${this.storehouse} storehouse is empty`;
    }
    const result = [
      `${this.storehouse} storehouse in ${this.location} available products:`,
    ];
    const sortedProducts = this.productStock.sort((a, b) =>
      a.productName.localeCompare(b.productName)
    );
    for (let each of sortedProducts) {
      result.push(
        `${each.productName}/Size:${each.size}/Quantity:${each.quantity}/Price:${each.price}$`
      );
    }
    return result.join('\n');
  }
}

const storeHouse = new FashionRetailInventory('East', 'Milano');
console.log(storeHouse.addProduct('Shirt', 'M', 10, 25.0));
console.log(storeHouse.addProduct('T-Shirt', 'M', 10, 25.0));
console.log(storeHouse.addProduct('T-Shirt', 'A', 10, 25.0));
console.log(storeHouse.addProduct('Sweather', 'M', 10, 25.0));
console.log(storeHouse.addProduct('Sweather', 'M', 10, 25.0));
console.log(storeHouse.findProductsBySize('M'));
console.log(storeHouse.listProducts());
