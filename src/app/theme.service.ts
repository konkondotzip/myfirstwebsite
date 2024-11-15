import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private savedMode: string = localStorage.getItem('theme') ?? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  isDarkMode() {
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
}