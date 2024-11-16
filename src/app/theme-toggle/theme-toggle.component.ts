import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  private savedMode: string = localStorage.getItem('theme') ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  isDarkMode: boolean;

  checkDarkMode() {
    if (localStorage.getItem('theme') != null) {
      return (localStorage.getItem('theme') == "dark");
    }
    else return (this.savedMode == "dark");
  }

  setDarkMode(isDarkMode: boolean) {
    if (localStorage.getItem('theme') == null) {
      localStorage.setItem('theme', this.savedMode);
    }

    if (isDarkMode) {
      document.querySelector("html")?.classList.add('dark-theme');
      localStorage.setItem('theme', "dark");
    } else {
      document.querySelector("html")?.classList.remove('dark-theme');
      localStorage.setItem('theme', "light");
    }
  }

  constructor() {
    this.isDarkMode = this.checkDarkMode();
    this.setDarkMode(this.isDarkMode);
  }
  
  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.setDarkMode(this.isDarkMode);
  }
}
