import { planYourTrip } from './03planYourTrip.js';
import { expect } from 'chai';

describe('Main describe', () => {
  // choosingDestination (destination, season, year)
  describe('choosingDestination function', () => {
    it('different year than 2024', () => {
      expect(() =>
        planYourTrip.choosingDestination('Ski Resort', 'Winter', 2023)
      ).to.throw('Invalid Year!');
      expect(() =>
        planYourTrip.choosingDestination('Ski Resort', 'Winter', [])
      ).to.throw('Invalid Year!');
      expect(() =>
        planYourTrip.choosingDestination('Ski Resort', 'Winter', -200)
      ).to.throw('Invalid Year!');
      expect(() =>
        planYourTrip.choosingDestination('Ski Resort', 'Winter', undefined)
      ).to.throw('Invalid Year!');
      expect(() =>
        planYourTrip.choosingDestination('Ski Resort', 'Winter', null)
      ).to.throw('Invalid Year!');
    });
    it('destination different than <Ski Resort>', () => {
      expect(() =>
        planYourTrip.choosingDestination('Sky Resort', 'Winter', 2024)
      ).to.throw('This destination is not what you are looking for.');
      expect(() =>
        planYourTrip.choosingDestination(2000, 'Winter', 2024)
      ).to.throw('This destination is not what you are looking for.');
      expect(() =>
        planYourTrip.choosingDestination(undefined, 'Winter', 2024)
      ).to.throw('This destination is not what you are looking for.');
    });
    it('To be picked, the destination must meet the requirement', () => {
      expect(
        planYourTrip.choosingDestination('Ski Resort', 'Winter', 2024)
      ).to.be.equal(
        'Great choice! The Winter is the perfect time to visit the Ski Resort.'
      );
      expect(
        planYourTrip.choosingDestination('Ski Resort', 'Summer', 2024)
      ).to.be.equal(
        'Consider visiting during the Winter for the best experience at the Ski Resort.'
      );
    });
  });
  // exploreOptions (activities, activityIndex)
  describe('exploreOptions function', () => {
    it('remove element from an array', () => {
      expect(
        planYourTrip.exploreOptions(['Skiing', 'Snowboarding', 'Sliding'], 1)
      ).to.be.equal('Skiing, Sliding');
    });
    it('activities as not an array', () => {
      expect(() => planYourTrip.exploreOptions(undefined, 1)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.exploreOptions('Skiing', 1)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.exploreOptions(1234, 1)).to.throw(
        'Invalid Information!'
      );
    });
    it('activityIndex is not a number and is outside the limits of the array.', () => {
      expect(() =>
        planYourTrip.exploreOptions(
          ['Skiing', 'Snowboarding', 'Sliding'],
          'cheese'
        )
      ).to.throw('Invalid Information!');
      expect(() =>
        planYourTrip.exploreOptions(['Skiing', 'Snowboarding', 'Sliding'], -1)
      ).to.throw('Invalid Information!');
      expect(() =>
        planYourTrip.exploreOptions(['Skiing', 'Snowboarding', 'Sliding'], 3)
      ).to.throw('Invalid Information!');

      expect(() =>
        planYourTrip.exploreOptions(
          ['Skiing', 'Snowboarding', 'Sliding'],
          undefined
        )
      ).to.throw('Invalid Information!');
    });
    it('activityIndex is not a integer number', () => {
      expect(() =>
        planYourTrip.exploreOptions(['Skiing', 'Snowboarding', 'Sliding'], 2.5)
      ).to.throw('Invalid Information!');
    });
  });
  // estimateExpenses (distanceInKilometers, fuelCostPerLiter)
  describe('estimateExpenses function', () => {
    it('total cost is less or equal to $500', () => {
      expect(planYourTrip.estimateExpenses(10, 10)).to.equal(
        'The trip is budget-friendly, estimated cost is $100.00.'
      );
      expect(planYourTrip.estimateExpenses(10, 50)).to.equal(
        'The trip is budget-friendly, estimated cost is $500.00.'
      );
    });
    it('total cost is more than $500', () => {
      expect(planYourTrip.estimateExpenses(50, 50)).to.equal(
        'The estimated cost for the trip is $2500.00, plan accordingly.'
      );
      expect(planYourTrip.estimateExpenses(100, 50)).to.equal(
        'The estimated cost for the trip is $5000.00, plan accordingly.'
      );
    });
    it('check if first input is invalid', () => {
      expect(() => planYourTrip.estimateExpenses('10', 50)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(0, 50)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(-1, 50)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses('cheese', 50)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(undefined, 50)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses([], 50)).to.throw(
        'Invalid Information!'
      );
    });
    it('check if second input is invalid', () => {
      expect(() => planYourTrip.estimateExpenses(50, '10')).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(50, 0)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(50, -1)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(50, 'cheese')).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(50, undefined)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(50, [])).to.throw(
        'Invalid Information!'
      );
    });
    it('check if both inputs are invalid', () => {
      expect(() => planYourTrip.estimateExpenses('10', '10')).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(0, 0)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses(-1, -1)).to.throw(
        'Invalid Information!'
      );
      expect(() => planYourTrip.estimateExpenses('cheese', 'cheese')).to.throw(
        'Invalid Information!'
      );
      expect(() =>
        planYourTrip.estimateExpenses(undefined, undefined)
      ).to.throw('Invalid Information!');
      expect(() => planYourTrip.estimateExpenses([], [])).to.throw(
        'Invalid Information!'
      );
    });
  });
});
