import { Injectable } from '@angular/core';
import { Size } from './size';
import data from '../../../../../db.json';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  static defaultSizeId: number = 100;
  static defaultSizeName: string = "size_" + SizeService.defaultSizeId;

  static findDefaultSizeIndex(list: Size[]) {
    return list.findIndex(s => s.id == this.defaultSizeId);
  }

  static getAllSizes(): Size[] {
    let found: Size[] = data.sizes;
    return found;
  }
}
