import { workforceManagement } from './workforceManagement.js';
import { expect } from 'chai';

describe('Main description', () => {
  describe('recruitStaff Function', () => {
    it('If the value of the string role is different from "Developer", throw an error', () => {
      const result = () =>
        workforceManagement.recruitStaff('Ivan', 'Plumber', 5);
      expect(result).to.throw('We are not currently hiring for this role.');
    });
    it('experience is greater than or equal to 4', () => {
      const result = workforceManagement.recruitStaff('Ivan', 'Developer', 5);
      expect(result).to.equal(
        'Ivan has been successfully recruited for the role of Developer.'
      );
    });
    it('experience is lower than 4', () => {
      const result = workforceManagement.recruitStaff('Ivan', 'Developer', 3);
      expect(result).to.equal('Ivan is not suitable for this role.');
    });
    it('fourth it', () => {
      const result = () =>
        workforceManagement.recruitStaff('Ivan', 'Plumber', 3);
      expect(result).to.throw('We are not currently hiring for this role.');
    });
  });
  describe('computeWages Function', () => {
    it('Workers in this company receive equal pay per hour and this is BGN 18', () => {
      const result = workforceManagement.computeWages(1);
      expect(result).to.equal(18);
    });
    it('calculate the salary', () => {
      const result = workforceManagement.computeWages(150);
      expect(result).to.equal(150 * 18);
    });
    it('more than 160 hours? Add bonus 1500 BGN', () => {
      const result = workforceManagement.computeWages(170);
      expect(result).to.equal(170 * 18 + 1500);
    });
    it('validate input for negative number', () => {
      const result = () => workforceManagement.computeWages(-140);
      expect(result).to.throw('Invalid hours');
    });
    it('validate input for null', () => {
      expect(() => workforceManagement.computeWages(null)).to.throw(
        'Invalid hours'
      );
    });
    it('validate input for string', () => {
      expect(() => workforceManagement.computeWages('a')).to.throw(
        'Invalid hours'
      );
    });
    it('validate input for array', () => {
      expect(() => workforceManagement.computeWages([])).to.throw(
        'Invalid hours'
      );
    });
  });
  describe('dismissEmployee Function', () => {
    it('remove an element ', () => {
      const result = workforceManagement.dismissEmployee(
        ['Peter', 'Ivan', 'George'],
        1
      );
      expect(result).to.equal('Peter, George');
    });
    it('Invalid input for employee', () => {
      const result = () => workforceManagement.dismissEmployee('Ivan', 1);
      expect(result).to.throw('Invalid input');
    });
    it('Invalid input for index', () => {
      const result = () =>
        workforceManagement.dismissEmployee(['Peter', 'Ivan', 'George'], 'yes');
      expect(result).to.throw('Invalid input');
    });
    it('out of bound index', () => {
      const result = () =>
        workforceManagement.dismissEmployee(['Peter', 'Ivan', 'George'], 7);
      expect(result).to.throw('Invalid input');
    });
  });
});
