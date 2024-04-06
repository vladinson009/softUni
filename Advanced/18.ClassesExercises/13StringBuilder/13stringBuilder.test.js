import { expect } from 'chai';
import { StringBuilder } from './13stringBuilder.js';

describe('StringBuilder', () => {
  let sb;

  beforeEach(() => {
    sb = new StringBuilder();
  });
  describe('Check instance', () => {
    it('with no arg', () => {
      expect(sb._stringArray.join('')).to.equal('');
    });
    it('should be correctly defined as a class', () => {
      expect(StringBuilder).to.be.a('function');
    });
    it('should work with one string argument', () => {
      let instance = new StringBuilder('test');
      instance.append('ok');
      expect(instance.toString()).to.equal('testok');
    });
    it('should work with no string argument', () => {
      expect(sb._stringArray).to.be.an('array');
      expect(sb._stringArray.length).to.equal(0);
      expect(sb.toString()).to.equal('');
    });
  });
  describe('Check functionallity', () => {
    it('should append strings', () => {
      sb.append('one two');
      sb.append('three');
      expect(sb.toString()).to.equal('one twothree');
    });
    it('Cant append non-string', () => {
      expect(() => sb.append(123)).to.throw();
      expect(() => sb.append(null)).to.throw();
      expect(() => sb.append(123, 123)).to.throw();
    });
    it('should prepend strings', () => {
      sb.prepend('one two');
      sb.prepend('three');
      expect(sb.toString()).to.equal('threeone two');
    });
    it('Cant prepend non-string', () => {
      expect(() => sb.prepend(123)).to.throw();
      expect(() => sb.prepend(null)).to.throw();
      expect(() => sb.prepend(123, 123)).to.throw();
    });
    it('should insertAt strings', () => {
      sb.append('0123456');
      sb.insertAt('three', 5);
      expect(sb.toString()).to.equal('01234three56');
    });
    it('cant insert non-string', () => {
      sb.append('0123456');

      expect(() => sb.insertAt(1, 5)).to.throw();
    });
    it('should remove strings', () => {
      sb.append('0123456');
      sb.remove(2, 2);
      expect(sb.toString()).to.equal('01456');
    });
    it('cant remove non-index', () => {
      sb.append('0123456');
      sb.remove('as');
      expect(sb.toString()).to.equal('0123456');
    });
    it('should return string', () => {
      sb.append('0123456 ');
      sb.append('test');
      sb.remove(2, 2);
      expect(sb.toString()).to.equal('01456 test');
    });
    it('arguments should be only strings', () => {
      const inst = new StringBuilder();
      expect(() => new StringBuilder('test')).not.to.throw();
      expect(() => new StringBuilder()).not.to.throw();
      expect(() => new StringBuilder(['abc', 1])).to.throw();
      expect(() => new StringBuilder({})).to.throw();
      expect(() => new StringBuilder(null)).to.throw();
      expect(inst.toString()).to.equal('');
    });
    it('invalid params', () => {
      expect(() => sb.append(12)).to.throw();
      expect(() => sb.prepend(12)).to.throw();
      expect(() => sb.insertAt(12, 'test')).to.throw();
    });
  });
  it('toString works correctly - 2', () => {
    const expected = '\n A \n\r B\t123   ';
    const obj = new StringBuilder();

    expected.split('').forEach((s) => {
      obj.append(s);
      obj.prepend(s);
    });

    obj.insertAt('test', 4);

    obj.remove(2, 4);

    expect(obj.toString()).to.equal('  st21\tB \r\n A \n\n A \n\r B\t123   ');
  });
});
