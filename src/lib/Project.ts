import ClassLikeObject from "./ClassLikeObject";
import IClassConstructor from "./IClassConstructor";
import CSVHandler from "./CSVHandler";
export default class Project {
  objects: ClassLikeObject[] = [];
  classConstructor: IClassConstructor;

  constructor(path: string, classConstructor: IClassConstructor) {
    this.objects = CSVHandler.createObjects(path);
    this.classConstructor = classConstructor;
  }

  createClasses() {
    this.objects.forEach(obj => this.classConstructor.createClass(obj));
  }
}
