import { CommonModule } from '@angular/common';
import { Component, EventEmitter, output, Output } from '@angular/core';
import { Size } from './size';
import { FormsModule } from '@angular/forms';
import { SizeService } from './size.service';
import { Key } from '../key/key';

@Component({
  selector: 'app-size',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './size.component.html',
  styleUrl: './size.component.css'
})
export class SizeComponent {
  @Output() size = new EventEmitter<Size>();
  sizes: Size[] = [];
  selectedSize: Size = new Size();
  
  updateSize(size: Size) {
    this.size.emit(size);
  }

  constructor() {
    this.sizes = SizeService.getAllSizes();
    this.selectedSize = this.sizes[SizeService.findDefaultSizeIndex(this.sizes)];
  }
}
