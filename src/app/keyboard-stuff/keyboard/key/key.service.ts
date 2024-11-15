import { Injectable } from '@angular/core';
import { Key } from './key';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  static getKey(event: KeyboardEvent, keyboard: Key[]): Key | undefined {
    return keyboard.find(k => k.code == event.code) ?? keyboard.find(k => k.code == event.key);
  }

  /**
   * Position einer Taste innerhalb der Tastatur ändern.
   * @param keyCode Der `KeyboardEvent.code` der zu verschiebenden Taste.
   * @param prevKeyCode Die verschobene Taste landet rechts neben der Taste mit diesem `KeyboardEvent.code`.
   * @param offset Um eine andere Taste relativ von `keyCode` anzusteuern. Nützlich für Lücken.
   * Negative Zahl für Tasten links, positive Zahl für Tasten rechts. Standard: `0`
   */
  static moveKey(keys: Key[], keyCode: string, prevKeyCode: string, offset?: number) {
    let oldIndex = keys.findIndex(k => k.code == keyCode);
    let newIndex = keys.findIndex(k => k.code == prevKeyCode) + (offset ?? 0);

    if (newIndex < 0) {
      console.error("Taste \"" + keyCode + "\" konnte nicht verschoben werden")
    }

    if (newIndex >= keys.length) {
        var k = newIndex - keys.length + 1;
        while (k--) {
            keys.push();
        }
    }
    keys.splice(newIndex, 0, keys.splice(oldIndex, 1)[0]);

    return keys;
  };
  
  /**
   * Löschen einer Taste.
   * @param keyCode Der `KeyboardEvent.code` der Taste.
   * @param offset Um eine andere Taste relativ von `keyCode` anzusteuern. Nützlich für Lücken.
   * Negative Zahl für Tasten links, positive Zahl für Tasten rechts. Standard: `0`
   */
  static deleteKey(keys: Key[], keyCode: string, offset?: number) {
    keys.splice(keys.findIndex(k => k.code == keyCode) + (offset ?? 0), 1);

    return keys;
  }
  
  /**
   * Größe einer Taste verändern.
   * @param keyCode Der `KeyboardEvent.code` der Taste.
   * @param newSize Die neue Größe.
   * @param offset Um eine andere Taste relativ von `keyCode` anzusteuern. Nützlich für Lücken.
   * Negative Zahl für Tasten links, positive Zahl für Tasten rechts. Standard: `0`
   */
  static resizeKey(keys: Key[], keyCode: string, newSize: string, offset?: number) {
    let index = keys.findIndex(k => k.code == keyCode) + (offset ?? 0)
    keys[index].size = newSize;

    return keys;
  }

}
