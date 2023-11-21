const {
    lookupChar
} = require('./03charLookup');
const {
    expect
} = require('chai');

describe('Lookup Char tests', () => {

    describe('Undefined parameters', () => {

        it('first parameter', () => {
            expect(lookupChar(1, 1)).to.undefined;
        });
        it('second parameter', () => {
            expect(lookupChar('string', 'string')).to.undefined;
        });
        it('both parameters', () => {
            expect(lookupChar(1, 'string')).to.undefined;
        });
    });
    describe('Incorrect index', () => {
        it('negative index', () => {
            expect(lookupChar('hello world', -2)).to.equal('Incorrect index');
        });
        it('out of the bounds index', () => {
            expect(lookupChar('hello world', 11)).to.equal('Incorrect index');
        });
        it('floating index', () => {
            expect(lookupChar('hello wordl', 3.3)).to.undefined;
        });
    });

    describe('Return char at the correct index', () => {
        it('first index', () => {
            expect(lookupChar('hello world', 0)).to.equal('h');
        });
        it('last index index', () => {
            expect(lookupChar('hello world', 10)).to.equal('d');
        });
        it('extra tet', () => {
            expect(lookupChar('hello wordl', 3)).to.equal('l');
        });
    });
});