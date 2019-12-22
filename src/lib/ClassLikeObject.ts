import { ObjectType } from "./ObjectType";
import ObjectDetail from "./ObjectDetail";

export default class ClassLikeObject {
  id: string;
  name: string;
  type: ObjectType;
  fields: ObjectDetail[] = [];
  methods: ObjectDetail[] = [];

  implements: ClassLikeObject[] = [];
  extends: ClassLikeObject;
}
