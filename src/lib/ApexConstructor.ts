import IClassConstructor from "./IClassConstructor";
import ClassLikeObject from "./ClassLikeObject";

export default class ApexConstructor implements IClassConstructor {
  construct(classLikeObject: ClassLikeObject): string {
    let classText = `public ${classLikeObject.type} ${classLikeObject.name} {\n`;
    classLikeObject.fields.forEach(
      field => (classText += `${field.visibility} ${field.type} ${field.name};\n`)
    );
    classLikeObject.methods.forEach(
      method =>
        (classText += `${method.visibility} ${method.type} ${method.name}(${method.input}){}\n`)
    );
    classText += `}`;
    return classText;
  }
}
