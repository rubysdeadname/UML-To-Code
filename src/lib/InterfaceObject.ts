import ClassLikeObject from "./ClassLikeObject";
import IUMLObject from "./IUMLObject";

export default class InterfaceObject extends ClassLikeObject implements IUMLObject {
  generateText(): string {
    throw new Error("Method not implemented.");
  }
}
