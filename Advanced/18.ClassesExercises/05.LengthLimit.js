class Stringer {
    constructor(string, stringLength) {
        // original input
        this.string = string;
        this.stringLength = stringLength;

        //modificated input
        this.innerString = this.string;
        this.innerLength = this.stringLength;
    }
    increase(length) {
        this.innerLength += length;
    }
    decrease(length) {
        this.innerLength -= length;
        if (this.innerLength < 0) {
            this.innerLength = 0;
        }
    }
    toString() {
        if (this.innerLength < this.stringLength) {
            this.innerString = this.string.slice(0, this.innerLength);
            return this.innerString + '...';
        } else {
            return this.string
        }
    }
}


let test = new Stringer("Test", 4);
// console.log(test.toString()); // Test

// test.decrease(3);
// console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test