import { Injectable } from '@angular/core';
import { Layout } from './layout';
import data from '../../../../../db.json'

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  static defaultStandard: string = "iso";
  static defaultLanguage: string = "de";
  static defaultId: string = LayoutService.defaultStandard + "-" + LayoutService.defaultLanguage;
  static defaultName: string = "Deutsch (ISO)";

  static findDefaultLayoutIndex(list: Layout[]): number {
    return list.findIndex(l => l.id == this.defaultId);
  }

  static getAllLayouts(): Layout[] {
    return data.layouts;
  }
}
