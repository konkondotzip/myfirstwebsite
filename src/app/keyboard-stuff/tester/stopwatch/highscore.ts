import { Keyboard } from "../../keyboard/keyboard";

export class Highscore {
  keyboardString: string;
  score: number;
  name: string;
  time: number;

  constructor(keyboardString: string, score: number, name: string) {
    this.keyboardString = keyboardString;
    this.score = score;
    this.name = name;
    this.time = Date.now();
  }
}