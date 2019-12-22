import ClassLikeObject from "./ClassLikeObject";

export default interface IClassConstructor {
  construct(classLikeObject: ClassLikeObject): string;
}
