import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-test',
    imports: [CommonModule],
    templateUrl: './test.component.html',
    styleUrl: './test.component.css'
})
export class TestComponent {
  data: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
}
