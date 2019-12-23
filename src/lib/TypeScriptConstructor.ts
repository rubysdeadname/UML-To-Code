import IClassConstructor from "./IClassConstructor";
import ClassLikeObject from "./ClassLikeObject";
import { appendFileSync } from "fs";
import { ObjectType } from "./ObjectType";

export default class TypeScriptConstructor implements IClassConstructor {
  createClass(classLikeObject: ClassLikeObject): void {
    const classText = TypeScriptConstructor.createClassText(classLikeObject);
    appendFileSync(`${classLikeObject.name}.ts`, classText);
  }

  static createClassText(classLikeObject: ClassLikeObject): string {
    let classText = `export default ${classLikeObject.type} ${classLikeObject.name}`;
    if (classLikeObject.extends) classText += ` extends ${classLikeObject.extends.name}`;
    if (classLikeObject.implements.length) classText += ` implements `;
    classText += classLikeObject.implements.map(i => i.name).join(", ");
    classText += ` {\n`;

    classLikeObject.fields.forEach(field => {
      classText += `  `;
      if (field.visibility === "private") classText += `${field.visibility} `;
      classText += `${field.name}: ${field.returnType || "Object"};\n`;
    });
    if (classLikeObject.fields.length) classText += `\n`;

    classLikeObject.methods.forEach(method => {
      classText += `  `;
      if (classLikeObject.type === ObjectType.Class && method.visibility === "private")
        classText += `${method.visibility} `;
      classText += `${method.name}(${method.input}): ${method.returnType || "void"} `;
      if (classLikeObject.type === ObjectType.Class) classText += `{\n\n  }\n\n`;
      else if (classLikeObject.type === ObjectType.Interface) classText += `;\n`;
    });

    classText += `}`;
    return classText;
  }
}
