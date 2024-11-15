export class Key {
  code: KeyboardEvent["code"];
  size: string;
  text: string;
  visible: boolean;
  keyup: boolean;
  keydown: boolean;

  constructor(code?: KeyboardEvent["code"], size?: string, text?: string, visible?: boolean) {
    this.code = code ?? "";
    this.size = size ?? "u1";
    this.text = text ?? "";
    this.visible = visible ?? true;
    this.keyup = false;
    this.keydown = false;
  }
}