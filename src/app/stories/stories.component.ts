import { Component } from '@angular/core';
import { MainLogoComponent } from '../main-logo/main-logo.component';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MainLogoComponent],
  selector: 'app-stories',
  styleUrl: './stories.component.css',
  templateUrl: './stories.component.html',
})
export class StoriesComponent {
  title: string = "Konkon's Stories";

  foxChapters = Array(1).fill(0).map((_, i) => i + 1);
}
