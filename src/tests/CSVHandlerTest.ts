import { expect } from "chai";
import "mocha";
import CSVHandler from "../lib/CSVHandler";
import ClassLikeObject from "../lib/ClassLikeObject";

describe("CSVHandler.createObjects()", () => {
  it("should return empty array", () => {
    let csv: string;
    let objects: ClassLikeObject[];

    csv = ``;
    objects = CSVHandler.createObjects(csv);
    expect(objects).empty;

    csv = `Id,Name,Shape Library,Page ID,Contained By,Group,Line Source,Line Destination,Source Arrow,Destination Arrow,Text Area 1,Text Area 2,Text Area 3`;
    objects = CSVHandler.createObjects(csv);
    expect(objects).empty;

    csv = `Id,Name,Shape Library,Page ID,Contained By,Group,Line Source,Line Destination,Source Arrow,Destination Arrow,Text Area 1,Text Area 2,Text Area 3
    1,Page,,,,,,,,, Blank UML,,
    2,Text,Standard,1,,18,,,,, Blank UML,,
    3,Text,Standard,1,,18,,,,,"gbarker   |  December 22, 2019",,`;
    objects = CSVHandler.createObjects(csv);

    csv = `Id,Name,Shape Library,Page ID,Contained By,Group,Line Source,Line Destination,Source Arrow,Destination Arrow,Text Area 1,Text Area 2,Text Area 3
    14,Line,,1,,18,2,2,None,None,,,`;
    objects = CSVHandler.createObjects(csv);
    expect(objects).empty;
  });

  it("should return correct ClassLikeObject", () => {
    const name = "Dog";
    const fieldName = "furColour";
    const methodName = "wagTail";

    let csv: string = `Id,Name,Shape Library,Page ID,Contained By,Group,Line Source,Line Destination,Source Arrow,Destination Arrow,Text Area 1,Text Area 2,Text Area 3
    1,Class,,,,,,,,,${name},+ ${fieldName}: string,+ ${methodName}(speed)`;

    let objects = CSVHandler.createObjects(csv);
    expect(objects.length).to.equal(1);
    expect(objects[0].fields.length).to.equal(1);
    expect(objects[0].methods.length).to.equal(1);
    expect(objects[0].name).to.equal(name);
    expect(objects[0].type).to.equal("class");
    expect(objects[0].fields[0].name).to.equal(fieldName);
    expect(objects[0].methods[0].name).to.equal(methodName);
  });

  it("should create child that extends parent class", () => {
    let csv: string = `Id,Name,Shape Library,Page ID,Contained By,Group,Line Source,Line Destination,Source Arrow,Destination Arrow,Text Area 1,Text Area 2,Text Area 3
    1,Class,,,,,,,,,Child,,
    2,Class,,,,,,,,,Parent,,
    3,Line,,1,,,2,1,Generalization,None,,,`;

    let objects = CSVHandler.createObjects(csv);
    expect(objects[0].extends.name).to.equal("Parent");
  });

  it("should create child that implements parent interface", () => {
    let csv: string = `Id,Name,Shape Library,Page ID,Contained By,Group,Line Source,Line Destination,Source Arrow,Destination Arrow,Text Area 1,Text Area 2,Text Area 3
    1,Class,,,,,,,,,Child,,
    2,Class,,,,,,,,,"<<interface>>
    Parent",,
    3,Line,,1,,,2,1,Generalization,None,,,`;

    let objects = CSVHandler.createObjects(csv);
    expect(objects[0].implements[0].name).to.equal("Parent");
  });
});
