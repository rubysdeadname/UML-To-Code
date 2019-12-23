import { expect } from "chai";
import "mocha";

describe("Hello function", () => {
  it("should return hello world", () => {
    const hello = "Hello World!";
    expect(hello).to.equal("Hello World!");
  });
});
