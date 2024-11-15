import { Injectable } from '@angular/core';
import { Size } from './size/size';
import { Layout } from './layout/layout';
import { LayoutService } from './layout/layout.service';
import { Key } from './key/key';
import data from '../../../../db.json'

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  static defaultLayout: Layout = new Layout();
  static defaultSize: Size = new Size();
  static defaultKeyText: Key[] = KeyboardService.getAllKeyText();
  static defaultKeySizes: Key[] = KeyboardService.getAllKeySizes();
  
  static getAllKeySizes(standard?: string): Key[] {
    let list: Key[] = [];
    data.standards.find(std => std.id == (standard ?? "default"))?.keys.forEach((key: any) => {
      list.push(new Key(key.code, key.size, key.text, key.visible));
    });
    return list;
  }
  
  static getAllKeyText(language?: string): Key[] {
    let list: Key[] = [];
    data.languages.find(std => std.id == (language ?? "default"))?.keys.forEach((key: any) => {
      list.push(new Key(key.code, key.size, key.text, key.visible));
    });
    return list;
  }

  static getKeyText(keyCode: string, language: string): string {
    let data = this.getAllKeyText(language);
    return data.find(k => k.code == keyCode)?.text
    ?? this.defaultKeyText.find(k => k.code == keyCode)?.text
    ?? "";
  }
}
