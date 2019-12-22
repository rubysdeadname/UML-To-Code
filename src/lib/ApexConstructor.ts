import IClassConstructor from "./IClassConstructor";
import ClassLikeObject from "./ClassLikeObject";

export default class ApexConstructor implements IClassConstructor {
  construct(classLikeObject: ClassLikeObject): string {
    return "";
  }
}
