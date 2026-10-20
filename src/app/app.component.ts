import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { MainLogoComponent } from "./main-logo/main-logo.component";
import {Location} from '@angular/common';
import { filter } from 'rxjs';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MainLogoComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
  title="Konkon's Kontent"

  private readonly router = inject(Router);

  showLayout = signal(true);

  constructor() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.router.routerState.root;
        let currentRoute = route;

        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }

        this.showLayout.set(
          currentRoute.snapshot.data['showLayout'] ?? true
        );
      });
  }
}