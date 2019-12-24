import IClassConstructor from "./IClassConstructor";
import ClassLikeObject from "./ClassLikeObject";
import { appendFileSync } from "fs";
import { ObjectType } from "./ObjectType";

export default class ApexConstructor implements IClassConstructor {
  createClass(classLikeObject: ClassLikeObject): void {
    const classText = ApexConstructor.createClassText(classLikeObject);
    const classMetaText = ApexConstructor.createMetaText();
    appendFileSync(`${classLikeObject.name}.cls`, classText);
    appendFileSync(`${classLikeObject.name}.cls-meta.xml`, classMetaText);
  }

  static createClassText(classLikeObject: ClassLikeObject): string {
    let classText = ApexConstructor.addClassDeclaration(classLikeObject);
    classText += ApexConstructor.addExtendsAndImplements(classLikeObject);
    classText += ` {\n`;
    classText += ApexConstructor.addFields(classLikeObject);
    classText += ApexConstructor.addMethods(classLikeObject);
    classText += `}`;
    return classText;
  }

  private static addClassDeclaration(classLikeObject: ClassLikeObject): string {
    return `public ${classLikeObject.type} ${classLikeObject.name}`;
  }

  private static addExtendsAndImplements(classLikeObject: ClassLikeObject): string {
    let classText = "";
    if (classLikeObject.extends) classText += ` extends ${classLikeObject.extends.name}`;
    if (classLikeObject.implements.length) classText += ` implements `;
    classText += classLikeObject.implements.map(i => i.name).join(", ");
    return classText;
  }

  private static addFields(classLikeObject: ClassLikeObject): string {
    let classText = "";
    classLikeObject.fields.forEach(
      field =>
        (classText += `  ${field.visibility} ${field.returnType || "Object"} ${field.name};\n`)
    );
    if (classLikeObject.fields.length) classText += `\n`;
    return classText;
  }

  private static addMethods(classLikeObject: ClassLikeObject): string {
    let classText = "";
    classLikeObject.methods.forEach(method => {
      classText += `  `;
      if (classLikeObject.type === ObjectType.Class) classText += `${method.visibility} `;
      classText += `${method.returnType || "void"} ${method.name}(${method.input})`;
      if (classLikeObject.type === ObjectType.Class) classText += `{\n\n  }\n\n`;
      else if (classLikeObject.type === ObjectType.Interface) classText += `;\n`;
    });
    return classText;
  }

  static createMetaText(): string {
    const apiVersion = "46.0";
    return `<?xml version="1.0" encoding="UTF-8"?>
    <ApexClass xmlns="http://soap.sforce.com/2006/04/metadata">
        <apiVersion>${apiVersion}</apiVersion>
        <status>Active</status>
    </ApexClass>`;
  }
}
