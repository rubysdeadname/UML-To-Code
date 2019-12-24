import { expect } from "chai";
import "mocha";
import ApexConstructor from "../lib/ApexConstructor";
import SupportedLanguages from "../lib/SupportedLanguages";
import TypeScriptConstructor from "../lib/TypeScriptConstructor";
import JavaConstructor from "../lib/JavaConstructor";

describe("SupportedLanguages.parse()", () => {
  it("should return correct language constructor", () => {
    expect(SupportedLanguages.parse("apex")).to.be.a.instanceof(ApexConstructor);
    expect(SupportedLanguages.parse("ts")).to.be.a.instanceof(TypeScriptConstructor);
    expect(SupportedLanguages.parse("typescript")).to.be.a.instanceof(TypeScriptConstructor);
    expect(SupportedLanguages.parse("java")).to.be.a.instanceof(JavaConstructor);
  });
});
