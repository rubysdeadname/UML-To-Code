import ObjectDetail from "./ObjectDetail";
import { Visibility } from "./Visibility";

export default class Method extends ObjectDetail {
  input: string;

  static parse(methodText: string): Method {
    const method = new Method();
    const colonIndex = methodText.indexOf(":");
    const openBracketIndex = methodText.indexOf("(");
    const closeBracketIndex = methodText.indexOf(")");
    method.visibility = Visibility[methodText[0]] || "";
    method.name = methodText.substring(1, openBracketIndex);
    method.input = methodText.substring(openBracketIndex + 1, closeBracketIndex);
    method.returnType = colonIndex > 0 ? methodText.substring(colonIndex + 1) : "";
    return method;
  }
}
