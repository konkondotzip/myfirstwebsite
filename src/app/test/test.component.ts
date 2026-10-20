
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-test',
    imports: [],
    templateUrl: './test.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './test.component.css'
})
export class TestComponent {
  data: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];
}
