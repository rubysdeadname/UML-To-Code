import { Visibility } from "./Visibility";
import { ObjectDetailType } from "./ObjectDetailType";

export default class ObjectDetail {
  name: string;
  type: ObjectDetailType;
  input: string;
  visibility: Visibility;
  returnType: string;

  static parse(objectDetailText: string): ObjectDetail {
    const objectDetail = new ObjectDetail();
    const colonIndex = objectDetailText.indexOf(":");
    const openBracketIndex = objectDetailText.indexOf("(");
    const closeBracketIndex = objectDetailText.indexOf(")");

    let endOfNameIndex = objectDetailText.length;
    if (openBracketIndex > 0) endOfNameIndex = openBracketIndex;
    else if (colonIndex > 0) endOfNameIndex = colonIndex;

    objectDetail.name = objectDetailText.substring(1, endOfNameIndex).trim();
    objectDetail.type = openBracketIndex > 0 ? ObjectDetailType.Method : ObjectDetailType.Field;
    objectDetail.visibility = Visibility[objectDetailText[0]] || "";
    objectDetail.input = objectDetailText.substring(openBracketIndex + 1, closeBracketIndex).trim();
    objectDetail.returnType =
      colonIndex > 0 ? objectDetailText.substring(colonIndex + 1).trim() : "";
    return objectDetail;
  }
}
