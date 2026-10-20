import { Component, HostListener, PlatformRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { Location, PlatformLocation } from '@angular/common';

@Component({
    selector: 'app-main-logo',
    imports: [RouterLink, ThemeToggleComponent],
    templateUrl: './main-logo.component.html',
    styleUrl: './main-logo.component.css',
})
export class MainLogoComponent {
  href: string = "";
  @Input() title: string = "";

  public devWidth = Infinity;

  @HostListener('window:resize')
  onResize() {
    this.devWidth = window.innerWidth;
  }
  
}
