class Hex {
  constructor(val) {
    this.value = Number(val);
  }
  valueOf() {
    return this.value;
  }

  toString() {
    return "0x" + this.value.toString(16).toUpperCase();
  }
  plus(plusValue) {
    let result = this.value + Number(plusValue.valueOf());
    return new Hex(result);
  }
  minus(minusValue) {
    let result = this.value - Number(minusValue.valueOf());
    return new Hex(result);
  }
  parse(value) {
    return parseInt(value, 16);
  }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a + "==>" + b);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString() === "0xF");
console.log(FF.parse("AAA"));
