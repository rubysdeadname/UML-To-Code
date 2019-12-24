import ApexConstructor from "./ApexConstructor";
import TypeScriptConstructor from "./TypeScriptConstructor";
import JavaConstructor from "./JavaConstructor";
import IClassConstructor from "./IClassConstructor";

export default class SupportedLanguages {
  static parse(languageName: string): IClassConstructor {
    switch (languageName.toUpperCase()) {
      case "APEX":
        return new ApexConstructor();
      case "TS":
      case "TYPESCRIPT":
        return new TypeScriptConstructor();
      case "JAVA":
        return new JavaConstructor();
    }
  }
}
