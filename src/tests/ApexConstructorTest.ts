import { expect } from "chai";
import "mocha";
import ApexConstructor from "../lib/ApexConstructor";
import ClassLikeObject from "../lib/ClassLikeObject";
import ObjectDetail from "../lib/ObjectDetail";
import { ObjectType } from "../lib/ObjectType";
import { Visibility } from "../lib/Visibility";
import { ObjectDetailType } from "../lib/ObjectDetailType";

describe("ApexConstructor.createClassText()", () => {
  it("should return Apex class", () => {
    const testClass = new ClassLikeObject();
    const parentClass = new ClassLikeObject();
    const field = new ObjectDetail();
    const method = new ObjectDetail();

    const name = "TestClass";
    const parentName = "ParentClass";
    const fieldName = "testField";
    const fieldVisibility = Visibility["+"];
    const fieldType = "string";
    const methodName = "testMethod";
    const methodVisibility = Visibility["-"];
    const methodType = "string";

    field.name = fieldName;
    field.type = ObjectDetailType.Field;
    field.returnType = fieldType;
    field.visibility = fieldVisibility;
    method.name = methodName;
    method.type = ObjectDetailType.Method;
    method.returnType = methodType;
    method.visibility = methodVisibility;

    testClass.type = ObjectType.Class;
    testClass.name = name;
    parentClass.type = ObjectType.Class;
    parentClass.name = parentName;
    testClass.extends = parentClass;
    testClass.fields.push(field);
    testClass.methods.push(method);

    const classText = `public ${testClass.type} ${testClass.name} extends ${testClass.extends.name} {
  ${testClass.fields[0].visibility} ${testClass.fields[0].returnType} ${testClass.fields[0].name};

  ${testClass.methods[0].visibility} ${testClass.methods[0].returnType} ${testClass.methods[0].name}(${testClass.methods[0].input}){

  }

}`;
    expect(ApexConstructor.createClassText(testClass)).to.equal(classText);
  });
});
