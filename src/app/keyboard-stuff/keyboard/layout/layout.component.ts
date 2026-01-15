import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Layout } from './layout';

@Component({
    selector: 'app-layout',
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
    this.layouts = Layout.getAllLayouts();
    this.selectedLayout = this.layouts[Layout.findDefaultLayoutIndex(this.layouts)];
  }
}
