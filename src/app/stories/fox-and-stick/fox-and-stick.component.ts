import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

export const MAX_CHAPTERS: number = 1;

@Component({
  imports: [RouterLink],
  selector: 'app-fox-and-stick',
  styleUrl: './fox-and-stick.component.css',
  templateUrl: './fox-and-stick.component.html',
})
export class FoxAndStickComponent {
  readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);

  chapter: string = this.route.snapshot.queryParamMap.get('chapter') ?? "";

  get chapterUrl(): SafeResourceUrl {
    let chapter: number = 0;

    if (/^\d+$/.test(this.chapter)) {
      chapter = Number(this.chapter);
      if (chapter < 1 || chapter > MAX_CHAPTERS) chapter = 0;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `/fox-and-stick/chapter${chapter}.html`
    );
  }
}
