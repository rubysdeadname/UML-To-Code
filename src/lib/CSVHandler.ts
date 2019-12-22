import { readFileSync } from "fs";
import ClassLikeObject from "./ClassLikeObject";
import { ObjectType } from "./ObjectType";
import ObjectDetail from "./ObjectDetail";
import { ObjectDetailType } from "./ObjectDetailType";

export default class CSVHandler {
  static createObjects(path: string): ClassLikeObject[] {
    const csv = CSVHandler.getFileContents(path);
    const objects: ClassLikeObject[] = [];
    const csvObject = CSVHandler.convertCSVToObject(csv);
    csvObject.forEach(row => {
      if (row["Name"] === "Class") objects.push(this.convertRowToObject(row));
      else if (row["Name"] === "Line") this.resolveLines(objects, row);
    });
    return objects;
  }

  private static getFileContents(path: string): string {
    return readFileSync(path).toString();
  }

  private static seperateCSVIntoRows(csv: string): string[] {
    const sections: string[] = [];
    let section = "";
    csv.split("\n").forEach(row => {
      if (!isNaN(Number(row[0]))) {
        sections.push(section);
        section = "";
      } else if (section) {
        section += "~";
      }
      section += row;
    });
    sections.push(section);
    return sections;
  }

  private static convertCSVToObject(csv: string) {
    const rows = CSVHandler.seperateCSVIntoRows(csv).map(row => row.split(","));
    const header = rows[0];
    let data = [];
    rows.forEach((row, i) => {
      if (!i) return;
      let rowData = {};
      header.forEach((head, i) => (rowData[head] = row[i]));
      data.push(rowData);
    });
    return data;
  }

  private static convertRowToObject(row: string[]) {
    const classObject = new ClassLikeObject();
    const textAreaLines = row["Text Area 1"].split("~");
    classObject.id = row["Id"];
    if (textAreaLines[0] === `"<<interface>>`) {
      classObject.name = textAreaLines[1].substring(0, textAreaLines[1].length - 1).trim();
      classObject.type = ObjectType.Interface;
    } else {
      classObject.name = textAreaLines[0].trim();
      classObject.type = ObjectType.Class;
    }

    CSVHandler.addObjectDetailsToObject(classObject, row["Text Area 2"]);
    CSVHandler.addObjectDetailsToObject(classObject, row["Text Area 3"]);
    return classObject;
  }

  private static addObjectDetailsToObject(object: ClassLikeObject, textArea: string): void {
    textArea
      .substring(1, textArea.length - 1)
      .split("~")
      .forEach(detailText => {
        const detail = ObjectDetail.parse(detailText);
        if (!detail.name) return;
        if (detail.type === ObjectDetailType.Field) object.fields.push(detail);
        else if (detail.type === ObjectDetailType.Method) object.methods.push(detail);
      });
  }

  private static resolveLines(objects: ClassLikeObject[], row: string[]) {
    if (row["Source Arrow"] === "Generalization")
      CSVHandler.resolveGeneralisation(objects, row["Line Destination"], row["Line Source"]);
    if (row["Destination Arrow"] === "Generalization")
      CSVHandler.resolveGeneralisation(objects, row["Line Source"], row["Line Destination"]);
  }

  private static resolveGeneralisation(
    objects: ClassLikeObject[],
    sourceId: string,
    destinationId: string
  ) {
    const child = objects.find(obj => obj.id === sourceId);
    const parent = objects.find(obj => obj.id === destinationId);

    if (parent.type === ObjectType.Class) child.extends = parent;
    else if (parent.type === ObjectType.Interface) {
      CSVHandler.implementInterface(child, parent);
      child.implements.push(parent);
    }
  }

  private static implementInterface(child: ClassLikeObject, parent: ClassLikeObject) {
    parent.fields.forEach(field => {
      if (!child.fields.map(f => f.name).includes(field.name)) child.fields.push(field);
    });
    parent.methods.forEach(method => {
      if (!child.methods.map(m => m.name).includes(method.name)) child.methods.push(method);
    });
  }
}
