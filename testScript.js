const CSVHandler = require("./dist/CSVHandler").default;
const Project = require("./dist/Project").default;
const ApexConstructor = require("./dist/ApexConstructor").default;

//const path = "/Users/gbarker/Downloads/UML Class Diagram.csv";
//const path = "/Users/gbarker/Downloads/Blank Diagram.csv";
const path = "/Users/gbarker/Downloads/TesterDiagram (1).csv";
const p = new Project(path, new ApexConstructor());
p.createClasses();
//CSVHandler.createObjects(path);
