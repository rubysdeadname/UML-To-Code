import { expect } from "chai";
import "mocha";
import Project from "../lib/Project";
import ApexConstructor from "../lib/ApexConstructor";

describe("Project()", () => {
  it("should return a Project with correct attributes", () => {
    const project = new Project("", new ApexConstructor());
    expect(project.objects).empty;
  });
});
