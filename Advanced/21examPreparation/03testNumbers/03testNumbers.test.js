import { testNumbers } from './03testNumbers.js';
import { expect } from 'chai';
describe('Tests...', function () {
  describe('sumNumbers', function () {
    it('check if parameters are numbers', function () {
      expect(testNumbers.sumNumbers('1', 5)).to.be.undefined;
      expect(testNumbers.sumNumbers(1, '5')).to.be.undefined;
      expect(testNumbers.sumNumbers('1', '5')).to.be.undefined;
    });
    it('numbers can be positive and negative', function () {
      expect(testNumbers.sumNumbers(1.12, 2.22)).to.be.equal('3.34');
      expect(testNumbers.sumNumbers(5, 7)).to.be.equal('12.00');
      expect(testNumbers.sumNumbers(-5, -4)).to.be.equal('-9.00');
      expect(testNumbers.sumNumbers(10, -4)).to.be.equal('6.00');
    });
    it("if parameters aren't number, function return undefined", function () {
      expect(testNumbers.sumNumbers('a')).to.be.undefined;
      expect(testNumbers.sumNumbers([])).to.be.undefined;
      expect(testNumbers.sumNumbers(function () {})).to.be.undefined;
    });
    it('the function returns the sum of the given numbers, rounded to second number after decimal point', function () {
      expect(testNumbers.sumNumbers(1.255, 1.238)).to.equal('2.49');
      expect(testNumbers.sumNumbers(1.444, 2.555)).to.equal('4.00');
      expect(testNumbers.sumNumbers(4.52, 4.47)).to.equal('8.99');
    });
  });
  describe('numberChecker', function () {
    it('the function parses the input to number, and validates it', function () {
      expect(() => testNumbers.numberChecker('a')).to.throw(
        'The input is not a number!'
      );
      expect(() => testNumbers.numberChecker(undefined)).to.throw(
        'The input is not a number!'
      );
      expect(() => testNumbers.numberChecker(NaN)).to.throw(
        'The input is not a number!'
      );
    });
    it('even number', function () {
      expect(testNumbers.numberChecker(2)).to.equal('The number is even!');
      expect(testNumbers.numberChecker(0)).to.equal('The number is even!');
      expect(testNumbers.numberChecker(-2)).to.equal('The number is even!');
    });
    it('odd number', function () {
      expect(testNumbers.numberChecker(3)).to.equal('The number is odd!');
      expect(testNumbers.numberChecker(1)).to.equal('The number is odd!');
      expect(testNumbers.numberChecker(-3)).to.equal('The number is odd!');
    });
  });
  describe('averageSumArray', function () {
    it('avarage sum', function () {
      expect(testNumbers.averageSumArray([1, 2, 3])).to.equal(2);
      expect(testNumbers.averageSumArray([1, 2, 3, 4])).to.equal(2.5);
      expect(testNumbers.averageSumArray([1, -1, 1, -1])).to.equal(0);
      expect(testNumbers.averageSumArray([0, 0, 0, 0])).to.equal(0);
    });
  });
});
