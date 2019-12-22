import Field from "./Field";
import Method from "./Method";
import { ObjectType } from "./ObjectType";

export default class ClassLikeObject {
  name: string;
  type: ObjectType;
  fields: Field[] = [];
  methods: Method[] = [];

  implements: ClassLikeObject[] = [];
  extendeds: ClassLikeObject;
}
