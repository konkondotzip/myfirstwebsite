import { Key } from "./key/key";
import { Layout } from "./layout/layout";
import { Size } from "./size/size";
import data from "../keyboard-db.json"

/**
 * Eine Tastatur mit Tasten, angeordnet je nach Größe und Layout.
 */
export class Keyboard {
  static defaultLayout: Layout = new Layout();
  static defaultSize: Size = new Size();
  static defaultKeyLegends: Key[] = this.getKeyLegends();
  static defaultKeySizes: Key[] = this.getKeySizes();
  
  static getKeySizes(standard?: string): Key[] {
    let list: Key[] = [];
    data.standards.find(std => std.id == (standard ?? "default"))?.keys.forEach((key: any) => {
      list.push(new Key(key.code, key.size, key.legend, key.visible));
    });
    return list;
  }
  
  static getKeyLegends(language?: string): Key[] {
    let list: Key[] = [];
    data.languages.find(std => std.id == (language ?? "default"))?.keys.forEach((key: any) => {
      list.push(new Key(key.code, key.size, key.legend, key.visible));
    });
    return list;
  }
  
  /**
   * Die Tastatur kann man anhand der ID eindeutig im HTML oder CSS ansprechen.
   */
  id: string;
  /**
   * Je größer die Tastatur, desto mehr Tasten hat sie.
   */
  size: Size;
  /**
   * Sprache und Standard der Tastatur.
   */
  layout: Layout;
  /**
   * Die Tasten der Tastatur.
   */
  keys: Key[] = [];

  /**
   * Konstruiert eine Tastatur mitsamt Tasten, bereit zum Darstellen als HTML mithilfe 
   * von `KeyboardComponent`.
   * @param id Die Tastatur kann man anhand der ID eindeutig im HTML oder CSS ansprechen.
   * Default: `"keyboard_<n>"` mit `<n>` = Zufallszahl zwischen 0 und 10000
   * @param size Je größer die Tastatur, desto mehr Tasten hat sie. Default: `KeyboardService.defaultSize`
   * @param layout Sprache und Standard der Tastatur. Default: `KeyboardService.defaultLayout`
   */
  constructor(id?: string, size?: Size, layout?: Layout) {
    this.size = size ?? Keyboard.defaultSize;
    this.layout = layout ?? Keyboard.defaultLayout;
    this.id = id ?? "keyboard_" + this.layout.id + "_size-" + this.size.id;
    this.generateKeys();
  }

  public updateId() {
    this.id = "keyboard_" + this.layout.id + "_size-" + this.size.id;
  }

  public toString(): string {
    return this.layout.standard + "-" + this.layout.language + " " + this.size.id + " %"
  }
  
  /**
   * Position einer Taste innerhalb der Tastatur ändern.
   * @param keyCode Der `KeyboardEvent.code` der zu verschiebenden Taste.
   * @param prevKeyCode Die verschobene Taste landet rechts neben der Taste mit diesem `KeyboardEvent.code`.
   * @param offset Um eine andere Taste relativ von `keyCode` anzusteuern. Nützlich für Lücken.
   * Negative Zahl für Tasten links, positive Zahl für Tasten rechts. Default: `0`
   */
  private moveKey(keyCode: string, prevKeyCode: string, offset?: number) {
    let oldIndex = this.keys.findIndex(k => k.code == keyCode);
    let newIndex = this.keys.findIndex(k => k.code == prevKeyCode) + (offset ?? 0);

    if (newIndex < 0) {
      console.error("Taste \"" + keyCode + "\" konnte nicht verschoben werden")
    }

    if (newIndex >= this.keys.length) {
        var k = newIndex - this.keys.length + 1;
        while (k--) {
            this.keys.push();
        }
    }
    this.keys.splice(newIndex, 0, this.keys.splice(oldIndex, 1)[0]);
  };
  
  /**
   * Löschen einer Taste.
   * @param keyCode Der `KeyboardEvent.code` der Taste.
   * @param offset Um eine andere Taste relativ von `keyCode` anzusteuern. Nützlich für Lücken.
   * Negative Zahl für Tasten links, positive Zahl für Tasten rechts. Default: `0`
   */
  private deleteKey(keyCode: string, offset?: number) {
    this.keys.splice(this.keys.findIndex(k => k.code == keyCode) + (offset ?? 0), 1);
  }
  
  /**
   * Größe einer Taste verändern.
   * @param keyCode Der `KeyboardEvent.code` der Taste.
   * @param newSize Die neue Größe.
   * @param offset Um eine andere Taste relativ von `keyCode` anzusteuern. Nützlich für Lücken.
   * Negative Zahl für Tasten links, positive Zahl für Tasten rechts. Default: `0`
   */
  private resizeKey(keyCode: string, newSize: string, offset?: number) {
    let index = this.keys.findIndex(k => k.code == keyCode) + (offset ?? 0);
    this.keys[index].size = newSize;
  }
  
  /**
   * Generiert alle Tasten der Tastatur (Das `keys`-Array) je nach Layout und Größe mit Beschriftung.
   */
  public generateKeys() {
    /**
     * Layout-Standard wie "iso", "ansi" oder "jis"
     */
    let standard: string = this.layout.standard ?? Layout.defaultStandard;
    /**
     * Layout-Sprache wie "de", "us" oder "ja"
     */
    let language: string = this.layout.language ?? Layout.defaultLanguage;
    /**
     * Layout-Größen-ID wie 100 für 100 %, 96 für 96 % usw.
     */
    let size: number = this.size.id ?? Keyboard.defaultSize.id;
    /**
     * Die Tasten, bei denen sich die Beschriftungen vom Default unterscheiden
     */
    let keyLegends: Key[] = Keyboard.getKeyLegends(language);
    /**
     * Die Default-Tastenbeschriftung
     */
    let defaultKeyLegends: Key[] = Keyboard.getKeyLegends();
    /**
     * Die Tasten, bei denen sich die Größen vom Default unterscheiden
     */
    let keySizes: Key[] = Keyboard.getKeySizes(standard);
    // Als Ausgangspunkt richten sich die Größen der Tasten nach dem Default
    this.keys = Keyboard.getKeySizes();

    // Je nach Layout-Standard sind die Tasten anders angeordnet bzw. sind andere Tasten vorhanden
    switch (standard) {
      case "iso": {
        this.deleteKey("ZenkakuHankaku");
        this.deleteKey("HiraganaKatakana");
        this.deleteKey("henkan");
        this.deleteKey("muhenkan");
        break;
      }
      case "ansi": {
        this.deleteKey("ZenkakuHankaku");
        this.deleteKey("IntlBackslash");
        this.deleteKey("HiraganaKatakana");
        this.deleteKey("henkan");
        this.deleteKey("muhenkan");
        this.moveKey("Enter", "Quote");
        this.moveKey("Backslash", "Insert", -1);
        break;
      }
      case "jis": {
        this.moveKey("ZenkakuHankaku", "Backquote");
        this.moveKey("Backquote", "Equal");
        this.moveKey("IntlBackslash", "Slash");
        this.moveKey("muhenkan", "Space");
        this.moveKey("Space", "henkan");
        this.moveKey("henkan", "HiraganaKatakana");
        this.moveKey("HiraganaKatakana", "henkan");
        let found = defaultKeyLegends.find(k => k.code == "Backspace");
        if (found) {
          found.legend = "Back-space";
        }
        break;
      }
    }

    // Je nach Tastaturgröße sind unterschiedlich viele Tasten vorhanden
    if (size == 100) {
      this.deleteKey("Function");
    } else if (size == 80) {
      this.deleteKey("Function");
      this.deleteKey("Pause", 1);
      this.deleteKey("PageUp", 1);
      this.deleteKey("PageDown", 1);
      this.deleteKey("ArrowRight", 1);
      this.deleteKey("NumLock");
      this.deleteKey("Numpad0");
      this.deleteKey("Numpad1");
      this.deleteKey("Numpad2");
      this.deleteKey("Numpad3");
      this.deleteKey("Numpad4");
      this.deleteKey("Numpad5");
      this.deleteKey("Numpad6");
      this.deleteKey("Numpad7");
      this.deleteKey("Numpad8");
      this.deleteKey("Numpad9");
      this.deleteKey("NumpadDecimal");
      this.deleteKey("NumpadEnter");
      this.deleteKey("NumpadAdd");
      this.deleteKey("NumpadSubtract");
      this.deleteKey("NumpadMultiply");
      this.deleteKey("NumpadDivide");
      this.resizeKey("ArrowUp", "u1", 1);
      if (standard == "ansi") {
        this.resizeKey("Backslash", "u025", 1);
        this.resizeKey("Enter", "u325", 1);
      } else {
        this.resizeKey("Backslash", "u325", 1);
      }
    } else if (size <= 96) {
      this.deleteKey("Escape", 1);
      this.deleteKey("F4", 1);
      this.deleteKey("F8", 1);
      this.deleteKey("F12", 1);
      this.deleteKey("ScrollLock");
      this.deleteKey("Pause");
      this.deleteKey("Print", 1);
      this.deleteKey("Print", 1);
      this.deleteKey("Backspace", 1);
      this.deleteKey("PageUp", 1);
      if (size != 75) this.deleteKey("Insert");
      this.deleteKey("Enter", 1);
      this.deleteKey("PageDown", 1);
      this.deleteKey("Backslash", 1);
      this.deleteKey("ShiftRight", 1);
      this.deleteKey("ArrowUp", 1);
      this.deleteKey("MetaRight");
      this.deleteKey("ControlRight", 1);
      this.deleteKey("ArrowRight", 1);
      this.resizeKey("Numpad0", "u1");
      this.moveKey("PageDown", "F12", 1);
      this.moveKey("PageUp", "F12", 1);
      this.moveKey("End", "F12", 1);
      this.moveKey("Home", "F12", 1);
      this.moveKey("Print", "F12", 1);
      this.moveKey("Delete", "F12", 1);
      if (size != 60) {
        this.deleteKey("ContextMenu");
        this.resizeKey("ShiftRight", "u175");
        this.resizeKey("AltRight", "u1");
        this.resizeKey("ControlRight", "u1");
        this.resizeKey("Function", "u1");
      }
      if (standard == "jis") {
        if (size != 60) this.deleteKey("ControlRight");
        this.resizeKey("ArrowUp", "small-arrow-up");
        this.resizeKey("ArrowDown", "small-arrow-down");  
      }
      if (size <= 75) {
        this.deleteKey("NumLock");
        this.deleteKey("Numpad0");
        this.deleteKey("Numpad1");
        this.deleteKey("Numpad2");
        this.deleteKey("Numpad3");
        this.deleteKey("Numpad4");
        this.deleteKey("Numpad5");
        this.deleteKey("Numpad6");
        this.deleteKey("Numpad7");
        this.deleteKey("Numpad8");
        this.deleteKey("Numpad9");
        this.deleteKey("NumpadDecimal");
        this.deleteKey("NumpadEnter");
        this.deleteKey("NumpadAdd");
        this.deleteKey("NumpadSubtract");
        this.deleteKey("NumpadMultiply");
        this.deleteKey("NumpadDivide");
        this.moveKey("Insert", "Delete");
        this.moveKey("Delete", "Print");
        this.moveKey("PageUp", "Backspace");
        this.moveKey("PageDown", "Enter");
        this.moveKey("Home", "Backslash");
        if (standard == "iso") {
          this.moveKey("End", "ArrowUp");
        } else if (standard == "jis") {
          this.moveKey("End", "ShiftRight");
        } else if (standard == "ansi") {
          this.moveKey("PageDown", "Backslash", 1);
          this.moveKey("Home", "Enter");
          this.moveKey("End", "ArrowUp");
        }
      } 
      if (size <= 65) {
        this.deleteKey("F1");
        this.deleteKey("F2");
        this.deleteKey("F3");
        this.deleteKey("F4");
        this.deleteKey("F5");
        this.deleteKey("F6");
        this.deleteKey("F7");
        this.deleteKey("F8");
        this.deleteKey("F9");
        this.deleteKey("F10");
        this.deleteKey("F11");
        this.deleteKey("F12");
        standard == "jis" ? this.deleteKey("ZenkakuHankaku") : this.deleteKey("Backquote");
        this.deleteKey("PageUp");
        this.deleteKey("PageDown");
        this.moveKey("Delete", "Backspace");
        this.moveKey("ArrowRight", "ArrowDown");
        standard == "ansi" ? this.moveKey("Print", "Backslash") : this.moveKey("Print", "Enter");
      } 
      if (size == 60) {
        this.deleteKey("Delete");
        this.deleteKey("Print");
        this.deleteKey("Home");
        this.deleteKey("End");
        this.deleteKey("ArrowUp");
        this.deleteKey("ArrowLeft");
        this.deleteKey("ArrowDown");
        this.deleteKey("ArrowRight");
        if (standard == "jis") this.resizeKey("Function", "u1");
      }
    }

    // Tastengrößen und -text zu einem Array vereinen
    this.keys.forEach((key: Key) => {
      key.size = keySizes.find(k => k.code == key.code)?.size ?? key.size ?? "u1";
      key.legend = keyLegends.find(k => k.code == key.code)?.legend ?? defaultKeyLegends.find(k => k.code == key.code)?.legend ?? "";
    });
  }
}