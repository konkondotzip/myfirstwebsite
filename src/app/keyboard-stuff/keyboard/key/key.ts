export class Key {
  code: KeyboardEvent["code"];
  size: string;
  legend: string;
  visible: boolean;
  keyup: boolean;
  keydown: boolean;

  constructor(code?: KeyboardEvent["code"], size?: string, legend?: string, visible?: boolean) {
    this.code = code ?? "";
    this.size = size ?? "u1";
    this.legend = legend ?? "";
    this.visible = visible ?? true;
    this.keyup = false;
    this.keydown = false;
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