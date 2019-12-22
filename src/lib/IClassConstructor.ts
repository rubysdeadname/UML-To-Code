import ClassLikeObject from "./ClassLikeObject";
export default interface IClassConstructor {
  createClass(classLikeObject: ClassLikeObject): void;
}
