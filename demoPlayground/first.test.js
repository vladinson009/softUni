import { foo } from "./first.js";
import { expect } from "chai";

describe("home", () => {
  it("testTest", () => {
    expect(foo(1, 5)).to.equal(6);
  });
});
