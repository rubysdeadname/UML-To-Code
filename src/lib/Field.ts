import ObjectDetail from "./ObjectDetail";
import { Visibility } from "./Visibility";

export default class Field extends ObjectDetail {
  static parse(fieldText: string): Field {
    const field = new Field();
    const colonIndex = fieldText.indexOf(":");
    const endOfName = colonIndex > 0 ? colonIndex : fieldText.length;
    field.visibility = Visibility[fieldText[0]] || "";
    field.name = fieldText.substring(1, endOfName).trim();
    field.returnType =
      colonIndex > 0 ? fieldText.substring(colonIndex + 1).trim() : (field.returnType = "");

    return field;
  }
}
