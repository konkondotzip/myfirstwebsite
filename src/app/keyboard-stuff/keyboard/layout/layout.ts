import data from "../../keyboard-db.json"

/**
 * Das Layout einer Tastatur bestimmt, wie die Tasten angeordnet sind und was auf ihnen steht.
 */
export class Layout {
  /**
   * Um über eine Liste mehrerer Layouts iterieren zu können.
   */
  id: string = "";
  name: string = "";
  standard: string = "";
  language: string = "";
  
  static defaultStandard: string = "iso";
  static defaultLanguage: string = "de";
  static defaultId: string = this.defaultStandard + "-" + this.defaultLanguage;
  static defaultName: string = "Deutsch (ISO)";

  static findDefaultLayoutIndex(list: Layout[]): number {
    return list.findIndex(l => l.id == this.defaultId);
  }

  static getAllLayouts(): Layout[] {
    return data.layouts;
  }
  
  constructor(standard?: string, language?: string, id?: string, name?: string) {
    this.id = id ?? Layout.defaultId;
    this.name = name ?? Layout.defaultName;
    this.standard = standard ?? Layout.defaultStandard;
    this.language = language ?? Layout.defaultLanguage;
  }
}

