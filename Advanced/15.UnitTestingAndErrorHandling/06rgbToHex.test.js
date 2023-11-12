const {
    rgbToHexColor
} = require('./06rgbToHex.js');
const {
    expect
} = require('chai');

describe('Criteria', () => {
    it('in range', () => {
        expect(rgbToHexColor(0, 0, 0)).to.equal('#000000');
        expect(rgbToHexColor(255, 255, 255)).to.equal('#FFFFFF');
        expect(rgbToHexColor(125, 125, 125)).to.equal('#7D7D7D');

    });
    it('not in range', () => {
        expect(rgbToHexColor(0, 0, 256)).to.be.undefined;
        expect(rgbToHexColor(0, -1, 0)).to.be.undefined;
        expect(rgbToHexColor(256, 256, -1)).to.be.undefined;
    });
    it('invalid type', () => {
        expect(rgbToHexColor(0, 256)).to.be.undefined;
        expect(rgbToHexColor(255, '125', 0)).to.be.undefined;
        expect(rgbToHexColor('a', [1, 2], 5)).to.be.undefined;
    });
})