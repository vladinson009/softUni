const foo = require("./first");
const { expect } = require("chai");

describe("home", () => {
  it("testTest", () => {
    expect(() => foo(1, 5)).to.equals(6);
  });
});
