import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeyboardComponent } from "../keyboard/keyboard.component";
import { SizeComponent } from "../keyboard/size/size.component";
import { LayoutComponent } from "../keyboard/layout/layout.component";
import { StopwatchComponent } from "./stopwatch/stopwatch.component";
import { Key } from '../keyboard/key/key';
import { KeyService } from '../keyboard/key/key.service';
import { Layout } from '../keyboard/layout/layout';
import { Size } from '../keyboard/size/size';
import { Keyboard } from '../keyboard/keyboard';
import { FormsModule } from '@angular/forms';
import { KeyboardService } from '../keyboard/keyboard.service';

@Component({
  selector: 'app-keyboard-tester',
  standalone: true,
  imports: [KeyboardComponent, SizeComponent, LayoutComponent, StopwatchComponent, FormsModule, RouterLink],
  templateUrl: './keyboard-tester.component.html',
  styleUrl: './keyboard-tester.component.css'
})
export class KeyboardTesterComponent {
  keyboard: Keyboard = new Keyboard("keyboard_" + KeyboardService.defaultLayout.id + "_size-" + KeyboardService.defaultSize.id);
  size: Size = new Size();

  @ViewChild(StopwatchComponent)
  stopwatch: StopwatchComponent = inject(StopwatchComponent);

  /**
   * Update der Tastatur nach Auswahl aus `layout.component`-Dropdownmenü
   * @param layout Das gewählte Layout.
   */
  updateLayout(layout: Layout) {
    this.keyboard.layout = layout;
    this.keyboard.updateId();
    this.keyboard.generateKeys();
    this.stopwatch.stopGame();
    this.stopwatch.resetText();
  }
  /**
   * Update der Tastatur nach Auswahl aus `size.component`-Dropdownmenü
   * @param size Die gewählte Größe.
   */
  updateSize(size: Size) {
    this.keyboard.size = size;
    this.keyboard.updateId();
    this.keyboard.generateKeys().then(() => {
      this.size = this.keyboard.size;
    });
    this.stopwatch.stopGame();
    this.stopwatch.resetText();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    let key: Key | undefined = KeyService.getKey(event, this.keyboard.keys);
    if (key) {
      key.keydown = true;
      key.keyup = false;
    }
    this.stopwatch.checkWin();
  }
  
  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent) {
    let key: Key | undefined = KeyService.getKey(event, this.keyboard.keys);
    if (key) {
      key.keydown = false;
      key.keyup = true;
    }
    this.stopwatch.checkWin();
  }

  resetKeys() {
    this.keyboard.keys.forEach((key: Key) => {
      key.keyup = false;
      key.keydown = false;
    });
  }
}
