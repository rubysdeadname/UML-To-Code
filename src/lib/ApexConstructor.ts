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
    let classText = `public ${classLikeObject.type} ${classLikeObject.name}`;
    if (classLikeObject.extends) classText += ` extends ${classLikeObject.extends.name}`;
    if (classLikeObject.implements.length) classText += ` implements `;
    classText += classLikeObject.implements.map(i => i.name).join(", ");
    classText += ` {\n`;
    classLikeObject.fields.forEach(
      field =>
        (classText += `  ${field.visibility} ${field.returnType || "Object"} ${field.name};\n`)
    );

    if (classLikeObject.fields.length) classText += `\n`;

    classLikeObject.methods.forEach(method => {
      classText += `  `;
      if (classLikeObject.type === ObjectType.Class) classText += `${method.visibility} `;
      classText += `${method.returnType || "void"} ${method.name}(${method.input})`;
      if (classLikeObject.type === ObjectType.Class) classText += `{\n\n  }\n\n`;
      else if (classLikeObject.type === ObjectType.Interface) classText += `;\n`;
    });
    classText += `}`;
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
