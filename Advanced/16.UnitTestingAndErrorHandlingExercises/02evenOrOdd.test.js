const {
    isOddOrEven
} = require('./02evenOrOdd');
const {
    expect
} = require('chai');

describe('Should pass all test', () => {

    it('checking if its string', () => {
        expect(isOddOrEven(1)).to.undefined;
        expect(isOddOrEven([1])).to.undefined;
        expect(isOddOrEven({})).to.undefined;
        expect(isOddOrEven(function () {})).to.undefined;
    });
    it('check for odd length', () => {
        expect(isOddOrEven('asdfg')).to.equal('odd');
    });
    it('check for even length', () => {
        expect(isOddOrEven('asdfgh')).to.equal('even');
    });
    it('extra test for odd or even length', () => {
        expect(isOddOrEven('ac5sdf8g6h')).to.equal('even');
        expect(isOddOrEven('a23fh6gh')).to.equal('even');
        expect(isOddOrEven('asdf3gh')).to.equal('odd');
        expect(isOddOrEven('asdfggh')).to.equal('odd');
        expect(isOddOrEven('asdfgzh')).to.equal('odd');
    });
});