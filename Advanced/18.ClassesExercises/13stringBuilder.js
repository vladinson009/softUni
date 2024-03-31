const { expect } = require("chai");
const StringBuilder = require("./path/to/StringBuilder");

describe("StringBuilder", () => {
  let sb;

  beforeEach(() => {
    sb = new StringBuilder();
  });

  it("should be correctly defined as a class", () => {
    expect(StringBuilder).to.be.a("function");
  });

  describe("#append", () => {
    it("should add the string to the end of the storage", () => {
      sb.append("hello");
      sb.append("world");
      expect(sb.toString()).to.equal("hello world");
    });

    it("should throw a type error if argument is not a string", () => {
      expect(() => sb.append(123)).to.throw(
        TypeError,
        "Argument must be a string"
      );
    });
  });

  describe("#prepend", () => {
    it("should add the string to the beginning of the storage", () => {
      sb.prepend("world");
      sb.prepend("hello ");
      expect(sb.toString()).to.equal("hello world");
    });

    it("should throw a type error if argument is not a string", () => {
      expect(() => sb.prepend(123)).to.throw(
        TypeError,
        "Argument must be a string"
      );
    });
  });

  describe("#insertAt", () => {
    it("should insert the string at the given index", () => {
      sb.append("world");
      sb.insertAt("hello", 0);
      expect(sb.toString()).to.equal("hello world");
    });

    it("should throw a type error if argument is not a string", () => {
      expect(() => sb.insertAt(123, 0)).to.throw(
        TypeError,
        "Argument must be a string"
      );
    });
  });

  describe("#remove", () => {
    it("should remove elements starting at the given index", () => {
      sb.append("helloworlda");
      sb.remove(6, 5);
      expect(sb.toString()).to.equal("hellow");
    });
  });

  describe("#toString", () => {
    it("should return a string with all elements joined by an empty string", () => {
      sb.append("hello");
      sb.append("world");
      expect(sb.toString()).to.equal("hello world");
    });
  });
});
