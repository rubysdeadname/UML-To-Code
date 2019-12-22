import Project from "./Project";
import { readFileSync } from "fs";
import ClassLikeObject from "./ClassLikeObject";
import Field from "./Field";
import Method from "./Method";
import { ObjectType } from "./ObjectType";
import ObjectDetail from "./ObjectDetail";
import { ObjectDetailType } from "./ObjectDetailType";

export default class CSVHandler {
  createObjects(path: string): Project {
    const csv = this.getFileContents(path);
    const project = new Project();
    const csvObject = this.convertCSVToObject(csv);
    csvObject.forEach(row => {
      project.objects.push(this.convertRowToObject(row));
    });
    return project;
  }

  getFileContents(path: string): string {
    return readFileSync(path).toString();
  }

  seperateCSVIntoRows(csv: string): string[] {
    const sections: string[] = [];
    let section = "";
    csv.split("\n").forEach(row => {
      if (!isNaN(Number(row[0]))) {
        sections.push(section);
        section = "";
      } else {
        section += "~";
      }
      section += row;
    });
    return sections;
  }

  convertCSVToObject(csv: string) {
    const rows = this.seperateCSVIntoRows(csv).map(row => row.split(","));
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

  convertRowToObject(row: string[]) {
    const classObject = new ClassLikeObject();
    const textAreaLines = row["Text Area 1"].split("~");

    if (textAreaLines[0] === `"<<interface>>`) {
      classObject.name = textAreaLines[1].substring(0, textAreaLines[1].length - 1);
      classObject.type = ObjectType.Interface;
    } else {
      classObject.name = textAreaLines[0];
      classObject.type = ObjectType.Class;
    }

    this.addObjectDetailsToObject(classObject, row["Text Area 2"]);
    this.addObjectDetailsToObject(classObject, row["Text Area 3"]);

    console.log(classObject);
    return classObject;
  }

  addObjectDetailsToObject(object: ClassLikeObject, textArea: string): void {
    textArea
      .substring(1, textArea.length - 1)
      .split("~")
      .forEach(detailText => {
        const detail = ObjectDetail.parse(detailText);
        if (detail.type === ObjectDetailType.Field) object.fields.push(detail);
        else if (detail.type === ObjectDetailType.Method) object.methods.push(detail);
      });
  }
}
