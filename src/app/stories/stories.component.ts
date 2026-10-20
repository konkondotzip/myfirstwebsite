import { Component } from '@angular/core';
import { MainLogoComponent } from '../main-logo/main-logo.component';
import { RouterLink } from '@angular/router';
import { MAX_CHAPTERS } from './fox-and-stick/fox-and-stick.component';

@Component({
  imports: [MainLogoComponent, RouterLink],
  selector: 'app-stories',
  styleUrl: './stories.component.css',
  templateUrl: './stories.component.html',
})
export class StoriesComponent {
  title: string = "Konkon's Stories";

  foxChapters = Array(MAX_CHAPTERS).fill(0).map((_, i) => i + 1);
}
