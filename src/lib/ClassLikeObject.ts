import { ObjectType } from "./ObjectType";
import ObjectDetail from "./ObjectDetail";

export default class ClassLikeObject {
  name: string;
  type: ObjectType;
  fields: ObjectDetail[] = [];
  methods: ObjectDetail[] = [];

  implements: ClassLikeObject[] = [];
  extendeds: ClassLikeObject;
}
