import Field from "./Field";
import Method from "./Method";
import InterfaceObject from "./InterfaceObject";
import ClassObject from "./ClassObject";

export default class ClassLikeObject {
  name: string;
  fields: [Field];
  methods: [Method];

  implements: [InterfaceObject];
  extendeds: ClassObject;
}
