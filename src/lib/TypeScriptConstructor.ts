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
    let classText: string = "";
    classText += TypeScriptConstructor.addImportStatements(classLikeObject);
    classText += TypeScriptConstructor.addClassDeclaration(classLikeObject);
    classText += TypeScriptConstructor.addExtendsAndImplements(classLikeObject);
    classText += ` {\n`;
    classText += TypeScriptConstructor.addFields(classLikeObject);
    classText += TypeScriptConstructor.addMethods(classLikeObject);
    classText += `}`;
    return classText;
  }

  private static addImportStatements(classLikeObject: ClassLikeObject): string {
    let classText: string = "";
    if (classLikeObject.extends)
      classText += `import ${classLikeObject.extends.name} from './${classLikeObject.extends.name}'\n`;
    if (classLikeObject.implements.length)
      classLikeObject.implements.forEach(
        i => (classText += `import ${i.name} from './${i.name}'\n`)
      );
    return classText;
  }

  private static addClassDeclaration(classLikeObject: ClassLikeObject): string {
    return `export default ${classLikeObject.type} ${classLikeObject.name}`;
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
    classLikeObject.fields.forEach(field => {
      classText += `  `;
      if (field.visibility === "private") classText += `${field.visibility} `;
      classText += `${field.name}: ${field.returnType || "Object"};\n`;
    });
    if (classLikeObject.fields.length) classText += `\n`;
    return classText;
  }

  private static addMethods(classLikeObject: ClassLikeObject): string {
    let classText = "";
    classLikeObject.methods.forEach(method => {
      classText += `  `;
      if (classLikeObject.type === ObjectType.Class && method.visibility === "private")
        classText += `${method.visibility} `;
      classText += `${method.name}(${method.input}): ${method.returnType || "void"} `;
      if (classLikeObject.type === ObjectType.Class) classText += `{\n\n  }\n\n`;
      else if (classLikeObject.type === ObjectType.Interface) classText += `;\n`;
    });
    return classText;
  }
}
