const {
    createCalculator
} = require('./07addSubtract');
const {
    expect
} = require('chai');
describe('Main description', () => {

    let calculator = null;
    beforeEach(() => {
        calculator = createCalculator();
    });

    describe('Has all properties', () => {

        it('expect calculator to has "Add" property', () => {
            expect(calculator).to.has.ownProperty('add');
        });
        it('expect calculator to has "Subtract" property', () => {
            expect(calculator).to.has.ownProperty('subtract');
        });
        it('expect calculator to has "Get" property', () => {
            expect(calculator).to.has.ownProperty('get');
        });
    });
    describe('parse to Number', () => {
        it('parse to Number in "Add" property', () => {
            calculator.add('1');
            expect(calculator.get()).to.equal(1);
        });
        it('parse to Number in "Subtrat" property', () => {
            calculator.subtract('1');
            expect(calculator.get()).to.equal(-1);
        });
        it('parse to Number in "Add" and "Subtract" properties', () => {
            calculator.add('5');
            calculator.subtract('1');
            expect(calculator.get()).to.equal(4);
        });
    });
    describe('add and subtract multiple numbers', () => {
        it('only "Add" property', () => {
            calculator.add(5);
            calculator.add(7);
            calculator.add(3);
            expect(calculator.get()).to.equal(15);
        });
        it('only "Subtract" property', () => {
            calculator.subtract(5);
            calculator.subtract(7);
            calculator.subtract(3);
            expect(calculator.get()).to.equal(-15);
        });
        it('"Add" and "Subtract" properties', () => {
            calculator.add(5);
            calculator.subtract(7);
            calculator.add(3);
            expect(calculator.get()).to.equal(1);
        });
    })

});