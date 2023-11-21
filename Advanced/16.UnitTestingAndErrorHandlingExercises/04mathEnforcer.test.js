const {
    mathEnforcer
} = require('./04mathEnforcer');
const {
    expect
} = require('chai');

describe('test function', () => {

    describe('addFive', () => {
        it('expect string as undefined', () => {
            expect(mathEnforcer.addFive('5')).to.undefined;
        });
        it('expect number', () => {
            expect(mathEnforcer.addFive(5)).to.equal(10);
        });
        it('expect negative number', () => {
            expect(mathEnforcer.addFive(-10)).equal(-5);
        });
        it('floating point number', () => {
            expect(mathEnforcer.addFive(2.233)).to.be.closeTo(7.233, 0.01);
        });
        it('floating point negative number', () => {
            expect(mathEnforcer.addFive(-10.333)).to.be.closeTo(-5.333, 0.01);
        });

    });

    describe('subtractTen', () => {
        it('expect string as undefined', () => {
            expect(mathEnforcer.subtractTen('5')).to.undefined;
        });
        it('expect number', () => {
            expect(mathEnforcer.subtractTen(15)).to.equal(5);
        });
        it('expect negative number', () => {
            expect(mathEnforcer.subtractTen(-10)).equal(-20);
        });
        it('floating point number', () => {
            expect(mathEnforcer.subtractTen(10.25)).to.be.closeTo(0.25, 0.01);
        });
        it('floating point negative number', () => {
            expect(mathEnforcer.subtractTen(-10.333)).to.be.closeTo(-20.333, 0.01);
        });

    });

    describe('sum', () => {
        it('expect frist parameter string as undefined', () => {
            expect(mathEnforcer.sum('5', 1)).to.undefined;
        });
        it('expect second parameter string as undefined', () => {
            expect(mathEnforcer.sum(5, '1')).to.undefined;
        });
        it('expect number', () => {
            expect(mathEnforcer.sum(5, 5)).to.equal(10);
        });
        it('expect negative number', () => {
            expect(mathEnforcer.sum(-10, -4)).equal(-14);
        });
        it('floating point number', () => {
            expect(mathEnforcer.sum(10.25, 10.50)).to.be.closeTo(20.75, 0.01);
        });
        it('floating point negative number', () => {
            expect(mathEnforcer.sum(-10.333, -10)).to.be.closeTo(-20.333, 0.01);
        });
        it('floating point positive and negative number', () => {
            expect(mathEnforcer.sum(10.333, -10)).to.be.closeTo(0.333, 0.01);
        });

    });

});