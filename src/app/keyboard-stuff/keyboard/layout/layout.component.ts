import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Layout } from './layout';
import { LayoutService } from './layout.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
/**
 * Für den Selector zur Auswahl eines Layouts. Leitet das ausgewählte Layout an einen Parent weiter.
 */
export class LayoutComponent {
  @Output() layout = new EventEmitter<Layout>();
  layouts: Layout[] = [];
  selectedLayout: Layout = new Layout();

  updateLayout(layout: Layout) {
    this.layout.emit(layout);
  }

  constructor() {
    this.layouts = LayoutService.getAllLayouts();
    this.selectedLayout = this.layouts[LayoutService.findDefaultLayoutIndex(this.layouts)];
  }
}
