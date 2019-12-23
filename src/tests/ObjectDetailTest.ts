import { expect } from "chai";
import "mocha";
import ObjectDetail from "../lib/ObjectDetail";
import { Visibility } from "../lib/Visibility";

describe("objectDetail.parse()", () => {
  it("should return a field with no properties", () => {
    const objectDetail = ObjectDetail.parse("");
    expect(objectDetail.name).to.equal("");
    expect(objectDetail.input).to.equal("");
    expect(objectDetail.returnType).to.equal("");
    expect(objectDetail.type).to.equal("Field");
    expect(objectDetail.visibility).to.equal("");
  });

  it("should return correct Field", () => {
    const visibility = "+";
    const name = "testField";
    const returnType = "string";
    const fieldText = `${visibility} ${name}: ${returnType}`;
    const objectDetail = ObjectDetail.parse(fieldText);
    expect(objectDetail.visibility).to.equal(Visibility[visibility]);
    expect(objectDetail.name).to.equal(name);
    expect(objectDetail.returnType).to.equal(returnType);
  });

  it("should return correct Method", () => {
    const visibility = "+";
    const name = "testMethod";
    const input = "parameter";
    const returnType = "string";
    const fieldText = `${visibility} ${name}(${input}): ${returnType}`;
    const objectDetail = ObjectDetail.parse(fieldText);
    expect(objectDetail.visibility).to.equal(Visibility[visibility]);
    expect(objectDetail.name).to.equal(name);
    expect(objectDetail.input).to.equal(input);
    expect(objectDetail.returnType).to.equal(returnType);
  });
});
