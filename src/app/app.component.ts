import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from "./theme-toggle/theme-toggle.component";
import { MainLogoComponent } from "./main-logo/main-logo.component";
import {Location} from '@angular/common';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MainLogoComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title="Konkon's Kontent"
}