const expect = require('chai').expect;

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        let res = isRealString(99);
        expect(res).to.be.false;
    });

    it('should reject only space values', () => {
        let res = isRealString('      ');
        expect(res).to.be.false;
    });

    it('should accept string value withspaces', () => {
        let res = isRealString('  selam    ');
        expect(res).to.be.true;
    });

})