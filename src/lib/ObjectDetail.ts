import { Visibility } from "./Visibility";

export default class ObjectDetail {
  name: string;
  visibility: Visibility;
  returnType: string;

  stringify() {
    console.log(`${this.visibility} ${this.name}: ${this.returnType}`);
  }
}
