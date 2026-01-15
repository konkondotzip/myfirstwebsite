import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Size } from './size/size';
import { Keyboard } from './keyboard';

@Component({
    selector: 'app-keyboard',
    imports: [CommonModule],
    templateUrl: './keyboard.component.html',
    styleUrl: './keyboard.component.css',
    standalone: true
})
export class KeyboardComponent {
  @Input() keyboard: Keyboard = new Keyboard();
  /**
   * Um die Darstellung der Tastatur erst dann zu ändern, *nachdem* `keyboard` sich ändert.
   * In der HTML nach `keyboard.size.id` statt `size.id` zu gucken, würde die Darstellung ändern,
   * kurz *bevor* `keyboard.generateKeys()` fertig ist, was die Tastatur für einen Sekundenbruchteil
   * mit den noch unfertigen Tasten darstellen würde.
   */
  @Input() size: Size = new Size();
}
