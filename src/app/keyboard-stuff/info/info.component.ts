import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeyboardComponent } from "../keyboard/keyboard.component";
import { Keyboard } from '../keyboard/keyboard';
import { Size } from '../keyboard/size/size';
import { Layout } from '../keyboard/layout/layout';

@Component({
    selector: 'app-info',
    imports: [RouterLink, KeyboardComponent],
    templateUrl: './info.component.html',
    styleUrl: './info.component.css',
    standalone: true
})
export class InfoComponent {
  exampleDE: Keyboard = new Keyboard("exampleDE");
  exampleISO: Keyboard = new Keyboard("exampleISO", new Size(80));
  exampleANSI: Keyboard = new Keyboard("exampleANSI", new Size(80), new Layout("ansi", "us"));
  exampleJIS: Keyboard = new Keyboard("exampleJIS", new Size(80), new Layout("jis", "ja"));
  example100: Keyboard = new Keyboard("example100", new Size(100));
  example96: Keyboard = new Keyboard("example96", new Size(96));
  example80: Keyboard = new Keyboard("example80", new Size(80));
  example75: Keyboard = new Keyboard("example75", new Size(75));
  example65: Keyboard = new Keyboard("example65", new Size(65));
  example60: Keyboard = new Keyboard("example60", new Size(60));
}
