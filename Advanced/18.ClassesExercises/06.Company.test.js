const company = require('./06.Company');
const {
    expect
} = require('chai');
const c = new company()
describe('Check input', () => {

    it('should be valid input', () => {
        expect(Firma(c.addEmployee("Stanimir", 0, "engineer", "Construction"))).to.throw()
    })


})