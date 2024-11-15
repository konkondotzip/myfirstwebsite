import { Injectable } from '@angular/core';
import { Database } from '../../database';
import { Layout } from './layout';
import data from '../../../../db.json'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  static defaultStandard: string = "iso";
  static defaultLanguage: string = "de";
  static defaultId: string = LayoutService.defaultStandard + "-" + LayoutService.defaultLanguage;
  static defaultName: string = "Deutsch (ISO)";
  static standardsUrl: string = Database.url + "/standards";
  static languagesUrl: string = Database.url + "/languages";
  static layoutsUrl: string = Database.url + "/layouts";

  static findDefaultLayoutIndex(list: Layout[]): number {
    return list.findIndex(l => l.id == this.defaultId);
  }

  static getAllLayouts(): Layout[] {
    return data.layouts;
  }
}
