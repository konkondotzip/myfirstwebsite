import { Component, HostListener, inject, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeyboardComponent } from "../keyboard/keyboard.component";
import { SizeComponent } from "../keyboard/size/size.component";
import { LayoutComponent } from "../keyboard/layout/layout.component";
import { StopwatchComponent } from "./stopwatch/stopwatch.component";
import { Key } from '../keyboard/key/key';
import { Layout } from '../keyboard/layout/layout';
import { Size } from '../keyboard/size/size';
import { Keyboard } from '../keyboard/keyboard';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-keyboard-tester',
  standalone: true,
  imports: [KeyboardComponent, SizeComponent, LayoutComponent, StopwatchComponent, FormsModule, RouterLink],
  templateUrl: './keyboard-tester.component.html',
  styleUrl: './keyboard-tester.component.css'
})
export class KeyboardTesterComponent {
  keyboard: Keyboard = new Keyboard();
  size: Size = new Size();
  static defaultInputText = "Hier klicken und tippen...";
  inputText: string = KeyboardTesterComponent.defaultInputText;
  
  @ViewChild(StopwatchComponent)
  stopwatch: StopwatchComponent = inject(StopwatchComponent);

  onKeyDown($event: KeyboardEvent) {
    $event.preventDefault();
    this.inputText = KeyboardTesterComponent.defaultInputText;
  }

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
    this.keyboard.generateKeys();
    this.size = this.keyboard.size;
    this.stopwatch.stopGame();
    this.stopwatch.resetText();
  }

  findKey(event: KeyboardEvent): Key | undefined {
    return this.keyboard.keys.find(k => k.code == event.code) ?? this.keyboard.keys.find(k => k.code == event.key);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    if (event.code != "") {
      let key: Key | undefined = this.findKey(event);
      if (key) {
        key.keydown = true;
        key.keyup = false;
      }
      this.stopwatch.checkWin();
    }
  }
  
  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent) {
    if (event.code != "") {
      let key: Key | undefined = this.findKey(event);
      if (key) {
        key.keydown = false;
        key.keyup = true;
      }
      this.stopwatch.checkWin();
    }
  }

  resetKeys() {
    this.keyboard.keys.forEach((key: Key) => {
      key.keyup = false;
      key.keydown = false;
    });
  }
}
