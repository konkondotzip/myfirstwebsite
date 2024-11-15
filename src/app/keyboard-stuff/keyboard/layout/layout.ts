import { LayoutService } from "./layout.service";

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

  
  constructor(standard?: string, language?: string, id?: string, name?: string) {
    this.id = id ?? LayoutService.defaultId;
    this.name = name ?? LayoutService.defaultName;
    this.standard = standard ?? LayoutService.defaultStandard;
    this.language = language ?? LayoutService.defaultLanguage
  }
}

