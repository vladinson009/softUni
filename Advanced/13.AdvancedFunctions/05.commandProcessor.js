function solution() {

    return {
        text: '',
        append(str) {
            this.text += str
        },
        removeStart(n) {
            this.text = this.text.slice(n)
        },
        removeEnd(n) {
            this.text = this.text.slice(0, -n)
        },
        print() {
            console.log(this.text)
        },
    }

}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();