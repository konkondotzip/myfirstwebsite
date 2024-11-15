import { SizeService } from "./size.service";

export class Size {
  id: number;
  name?: string;

  constructor(id?: number, name?: string) {
    this.id = id ?? SizeService.defaultSizeId;
    this.name = name ?? SizeService.defaultSizeName;
  }
}