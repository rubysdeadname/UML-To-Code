import ClassLikeObject from "./ClassLikeObject";
import IClassConstructor from "./IClassConstructor";
import { writeFileSync } from "fs";
export default class Project {
  objects: ClassLikeObject[] = [];
  classConstructor: IClassConstructor;
}
