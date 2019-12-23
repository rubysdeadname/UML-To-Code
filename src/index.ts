import Project from "./lib/Project";
import SupportedLanguages from "./lib/SupportedLanguages";
import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What is the filepath of your CSV data? \n", (path: string) => {
  rl.question("What language do you want to generate? \n", (language: string) => {
    const languageConstructor = SupportedLanguages.parse(language);
    if (!languageConstructor) throw "That language is not currently supported";
    const project = new Project(path, languageConstructor);
    project.createClasses();
    console.log("Classes created successfully");
    rl.close();
  });
});
