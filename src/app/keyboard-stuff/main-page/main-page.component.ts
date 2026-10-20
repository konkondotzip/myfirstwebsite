import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-main-page',
    imports: [RouterLink],
    templateUrl: './main-page.component.html',
    styleUrl: './main-page.component.css',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: true
})
export class MainPageComponent {

}
