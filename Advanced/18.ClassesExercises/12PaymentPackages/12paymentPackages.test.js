const { expect } = require("chai");
const { PaymentPackage } = require("./12paymentPackages.js");

describe("test for PaymentPackage", () => {
  let instance;
  beforeEach(() => {
    instance = new PaymentPackage("Test", 100);
  });

  describe("check for correct instance", () => {
    it("should be correct name", () => {
      expect(instance._name).to.equal("Test");
      expect(typeof instance._name).to.equal("string");
    });
    it("should be correct value", () => {
      expect(instance._value).to.equal(100);
      expect(typeof instance._value).to.equal("number");
    });
    it("should be correct VAT", () => {
      expect(instance._VAT).to.equal(20);
      expect(typeof instance._VAT).to.equal("number");
    });
    it("should be correct active status", () => {
      expect(instance._active).to.equal(true);
      expect(instance._active).to.be.a("boolean");
      expect(typeof instance._active).to.be.equal("boolean");
    });
    it('should return correct string representation with "(inactive)" label if package is inactive', function () {
      instance.active = false;
      expect(instance.toString()).to.equal(
        "Package: Test (inactive)\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120"
      );
    });
    it("active true", () => {
      instance.active = true;
      expect(instance.toString()).to.equal(
        "Package: Test\n- Value (excl. VAT): 100\n- Value (VAT 20%): 120"
      );
    });
  });

  describe("check parameters", () => {
    it("check for name", () => {
      expect(new PaymentPackage(100, 100)).to.throw(
        Error("Name must be a non-empty string")
      );
      expect(new PaymentPackage("", 100)).to.throw(
        Error("Name must be a non-empty string")
      );
      expect(new PaymentPackage([], 100)).to.throw(
        Error("Name must be a non-empty string")
      );
      expect(new PaymentPackage(null, 100)).to.throw(
        Error("Name must be a non-empty string")
      );
      expect(new PaymentPackage("Test", 100)).not.to.throw(
        "Name must be a non-empty string"
      );
    });

    it("check for value", () => {
      expect(new PaymentPackage("Test", "Test")).to.throw(
        Error("Value must be a non-negative number")
      );
      expect(new PaymentPackage("Test", -1)).to.throw(
        Error("Value must be a non-negative number")
      );
      expect(new PaymentPackage("Test", [])).to.throw(
        Error("Value must be a non-negative number")
      );
      expect(new PaymentPackage("Test", null)).to.throw(
        Error("Value must be a non-negative number")
      );
      expect(new PaymentPackage("Test")).to.throw(
        Error("Value must be a non-negative number")
      );
      expect(new PaymentPackage("Test", "")).to.throw(
        Error("Value must be a non-negative number")
      );
      expect((instance._value = 0)).not.to.throw();
      expect(new PaymentPackage("Test", 10)).not.to.throw(
        "Value must be a non-negative number"
      );
    });

    it("check both parameters", () => {
      expect(new PaymentPackage()).to.throw("no parameters");
      expect(new PaymentPackage(null, null)).to.throw("null parameters");
      expect(new PaymentPackage("name")).to.throw("one parameter");
    });
  });

  describe("check getter and setter", () => {
    it("check name", () => {
      instance._name = "changed";
      expect(instance._name).to.equal("changed");
    });
    it("check value", () => {
      instance._value = 15;
      expect(instance._value).to.equal(15);
    });
    it("check VAT", () => {
      instance._VAT = 10;
      expect(instance._VAT).to.equal(10);
      expect(instance._VAT).not.to.throw("VAT must be a non-negative number");
    });
    it("check active status", () => {
      instance._active = false;
      expect(instance._active).to.equal(false);
    });
  });

  describe("extra cases", () => {
    it("check VAT for wrong types", () => {
      expect(typeof instance._VAT).to.equal("number");
      expect(instance._VAT).to.equal(20);
    });
    it("check VAT for negative number", () => {
      expect(() => (instance._VAT = -10)).to.throw(
        "VAT must be a non-negative number"
      );
    });
    it("check VAT for string type", () => {
      expect(() => (instance._VAT = "-1a0")).to.throw(
        "VAT must be a non-negative number"
      );
    });
    it("check VAT if is array", () => {
      expect(() => (instance._VAT = [-10])).to.throw(
        "VAT must be a non-negative number"
      );
    });
  });
  it("check active for type", () => {
    expect(typeof instance._active).to.equal("boolean");
  });
  it("active with wrong type", () => {
    expect(() => (instance._active = "123")).to.throw(
      "Active status must be a boolean"
    );
  });
  it("active with array type", () => {
    expect(() => (instance._active = [1, 2])).to.throw(
      "Active status must be a boolean"
    );
  });
  it("active change boolean status", () => {
    expect(() => (instance._active = false)).not.to.throw(
      "Active status must be a boolean"
    );
  });

  //////
  it("Set value to null", () => {
    let instance = new PaymentPackage("Name", 100);
    assert.doesNotThrow(() => {
      instance.value = 0;
    });
  });
  //////
});
