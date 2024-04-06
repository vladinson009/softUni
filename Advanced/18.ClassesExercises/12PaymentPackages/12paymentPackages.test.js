import { PaymentPackage } from './12paymentPackages.js';
import { expect } from 'chai';

describe('tests for class PaymentPackage', () => {
  let instance;
  beforeEach(() => (instance = new PaymentPackage('Test', 100)));

  it('test0.1', () => {
    const output = [
      `Package: ${instance.name}` +
        (instance.active === false ? ' (inactive)' : ''),
      `- Value (excl. VAT): ${instance.value}`,
      `- Value (VAT ${instance.VAT}%): ${
        instance.value * (1 + instance.VAT / 100)
      }`,
    ];
    let str = output.join('\n');
    expect(instance.name).to.equal('Test');
    expect(instance.value).to.equal(100);
    expect(instance.active).to.equal(true);
    expect(instance.VAT).to.equal(20);
    expect(instance.toString()).to.equal(str);
  });
  it('test1', () => {
    instance.name = 'Demo';
    expect(instance.name).to.equal('Demo');
  });
  it('test1.1', () => {
    expect(() => new PaymentPackage('Demo', 11)).not.to.throw();
  });
  it('test1.2', () => {
    expect(() => new PaymentPackage('12', 0)).not.to.throw();
  });
  it('test1.3', () => {
    instance.VAT = 10;
    instance.name = 'Value';
    instance.value = 123;
    instance.active = true;

    expect(instance.toString()).not.to.contain('inactive');
  });
  it('test2', () => {
    instance.value = 12;
    expect(instance.value).to.equal(12);
  });
  it('test3', () => {
    instance.VAT = 30;
    expect(instance.VAT).to.equal(30);
  });
  it('test4', () => {
    instance.active = true;
    expect(instance.active).to.be.true;
  });
  it('test5', () => {
    expect(() => new PaymentPackage(10, 'Demo')).to.throw();
  });
  it('test5.1', () => {
    expect(() => new PaymentPackage('', 1)).to.throw();
  });
  it('test5.2', () => {
    expect(() => new PaymentPackage('Demo', -1)).to.throw();
  });
  it('test6', () => {
    expect(() => new PaymentPackage(10)).to.throw();
  });
  it('test6.1', () => {
    expect(() => new PaymentPackage('10')).to.throw();
  });
  it('test7', () => {
    expect(() => new PaymentPackage()).to.throw();
  });
  it('test7.1', () => {
    expect(() => new PaymentPackage(10, 10)).to.throw();
  });
  it('test8', () => {
    instance.active = false;
    expect(instance.toString()).to.contain('inactive');
  });
  it('test9', () => {
    instance.active = true;
    expect(instance.toString()).not.to.contain('inactive');
  });
  it('test9.1', () => {
    expect(() => (instance.active = -1)).to.throw();
  });
  it('test9.2', () => {
    expect(() => (instance.active = undefined)).to.throw();
  });
  it('test9.3', () => {
    expect(() => (instance.active = 'Demo')).to.throw();
  });
  it('test9.4', () => {
    expect(() => (instance.active = {})).to.throw();
  });
  it('test10', () => {
    expect(() => (instance.VAT = -1)).to.throw();
  });
  it('test11', () => {
    expect(() => (instance.VAT = '-1')).to.throw();
  });
  it('test12', () => {
    expect(() => (instance.VAT = undefined)).to.throw();
  });
  it('test13', () => {
    expect(() => (instance.VAT = undefined)).to.throw();
  });
  it('test14', () => {
    expect(() => (instance.value = 0)).not.to.throw();
  });
  it('test15', () => {
    expect(instance.name.length == 0).to.be.false;
  });
  it('test16', () => {
    expect(instance.value.length == 0).to.be.false;
  });
  it('test17', () => {
    expect(instance.VAT.length == 0).to.be.false;
  });
  it('test18', () => {
    expect(instance.active.length == 0).to.be.false;
  });
  it('test19', () => {
    expect(instance.toString().length == 0).to.be.false;
  });
});
