import Project from "./Project";
import { readFileSync } from "fs";
import ClassObject from "./ClassObject";
import Field from "./Field";
import Method from "./Method";

export default class CSVHandler {
  createObjects(path: string): Project {
    const csv = this.getFileContents(path);
    const project = new Project();
    const csvObject = this.convertCSVToObject(csv);
    csvObject.forEach(row => {
      if (row.Name === "Class") project.objects.push(this.handleClassRow(row));
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

  handleClassRow(row: string[]) {
    const classObject = new ClassObject();
    classObject.name = row["Text Area 1"];
    row["Text Area 2"]
      .substring(1, row["Text Area 2"].length - 1)
      .split("~")
      .forEach(fieldText => {
        const field = Field.parse(fieldText);
        classObject.fields.push(field);
      });

    row["Text Area 3"]
      .substring(1, row["Text Area 3"].length - 1)
      .split("~")
      .forEach(methodText => {
        const method = Method.parse(methodText);
        classObject.methods.push(method);
      });
    return classObject;
  }
}
