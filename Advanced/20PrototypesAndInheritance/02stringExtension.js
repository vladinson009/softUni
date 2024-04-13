(function foo() {
  String.prototype.ensureStart = function (str) {
    if (this.indexOf(str) != 0) {
      return str + this.toString();
    } else {
      return this.toString();
    }
  };
  String.prototype.ensureEnd = function (str) {
    let endFirstIndex = this.length - str.length;
    if (this.lastIndexOf(str) == endFirstIndex) {
      return this.toString();
    } else {
      return this.toString() + str;
    }
  };
  String.prototype.isEmpty = function () {
    return this.length === 0;
  };
  String.prototype.truncate = function (n) {
    if (this.length <= n) {
      return this.toString();
    }

    if (this.includes(' ')) {
      let lastSpaceIndex = this.length;
      do {
        lastSpaceIndex = this.lastIndexOf(' ', lastSpaceIndex - 1);
      } while (lastSpaceIndex !== -1 && lastSpaceIndex + 3 > n);
      return `${this.slice(0, lastSpaceIndex)}...`;
    }

    if (n > 3) {
      let string = `${this.slice(0, n - 3)}...`;
      return string;
    }
    return '.'.repeat(n);
  };
  String.format = function (string, ...params) {
    let regExp = /{\d+}/;
    for (let each of params) {
      string = string.replace(regExp, each);
    }
    return string;
  };
})();

let str = 'my string';
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox', 'quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}', 'dog');
console.log(str);
