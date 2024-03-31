const { isSymmetric } = require("./05checkForSymmetry.js");
const { expect } = require("chai");

describe("Symmetry checker", () => {
  describe("Symmetric array", () => {
    it("check for symmetriy with even array length", () => {
      expect(isSymmetric([1, 2, 2, 1])).to.be.true;
    });
    it("check for symmetriy with odd array length", () => {
      expect(isSymmetric([1, 2, 1])).to.be.true;
    });
    it("check for symmetry with negative number", () => {
      expect(isSymmetric([-1, -2, -2, -1])).to.be.true;
    });
    it("check for symmetry with letter", () => {
      expect(isSymmetric(["a", "b", "b", "a"])).to.be.true;
    });
  });
  describe("non-symmetric array", () => {
    it("check for non-symmetry with even length", () => {
      expect(isSymmetric([1, 2, 3, 1])).to.be.false;
    });
    it("check for non-symmetry with odd length", () => {
      expect(isSymmetric([1, 2, 3])).to.be.false;
    });
    it("check for non-symmetry with letter", () => {
      expect(isSymmetric(["a", "a", "b"])).to.be.false;
    });
    it("check for non-symmetry with different type", () => {
      expect(isSymmetric([1, 2, "2", 1])).to.be.false;
    });
  });
  describe("check for non-array type", () => {
    it("type is Object", () => {
      expect(
        isSymmetric({
          1: 1,
        })
      ).to.be.false;
    });
    it("type is Arguments", () => {
      expect(isSymmetric("asd", 1, "b")).to.be.false;
    });
  });
});
