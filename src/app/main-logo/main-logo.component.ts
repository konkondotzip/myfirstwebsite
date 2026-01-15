import { Component, HostListener, PlatformRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { ThemeToggleComponent } from "../theme-toggle/theme-toggle.component";
import { Location, PlatformLocation } from '@angular/common';

@Component({
    selector: 'app-main-logo',
    imports: [RouterLink, ThemeToggleComponent],
    templateUrl: './main-logo.component.html',
    styleUrl: './main-logo.component.css'
})
export class MainLogoComponent {
  href: string = "";
  title: string = "";

  public devWidth = Infinity;

  hierarchy = new Map<string, Breadcrumb>([
    [
      "keyboards",
      new Breadcrumb(
        "Tastatur-Tools",
        "/keyboards",
        new Map<string, Breadcrumb>(
          [
            [
              "tester",
              new Breadcrumb("Tastatur-Tester", "/keyboards/tester", new Map<string, Breadcrumb>([]))
            ],
            [
              "info",
              new Breadcrumb("Infos über Tastaturen", "/keyboards/info", new Map<string, Breadcrumb>([]))
            ]
          ]
        )
      )
    ],
    [
      "tetris",
      new Breadcrumb("Tetris", "/tetris", new Map<string, Breadcrumb>([]))
    ]
  ]);

  breadcrumbs: (Breadcrumb | undefined)[] = [];

  constructor(private router: Router, platform: PlatformRef) {
    
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.href = event.urlAfterRedirects;
        console.log(this.href);
        let path = this.href.split("/");

        let tree = this.hierarchy;

        path.forEach((link) => {
          if (tree.has(link)) {
            let page = tree.get(link);
            this.breadcrumbs.push(page);
            tree = page?.sublinks ?? new Map([]);
          }
        });
        this.title = this.breadcrumbs[this.breadcrumbs.length - 1]?.name ?? "Titel";
        if (this.breadcrumbs.length == 0) this.title = "Konkon's Kontent"
        console.log(this.breadcrumbs);
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.devWidth = window.innerWidth;
  }
  
}

class Breadcrumb {
  name: string;
  link: string;
  sublinks: Map<string, Breadcrumb>;

  constructor(name: string, link: string, sublinks: Map<string, Breadcrumb>) {
    this.name = name;
    this.link = link;
    this.sublinks = sublinks;
  }
}
