import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, OnDestroy, Output } from '@angular/core';
import { Key } from '../../keyboard/key/key';
import { Highscore } from './highscore';
import { Keyboard } from '../../keyboard/keyboard';
import { StopwatchService } from './stopwatch.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormControl, FormsModule, Validators } from '@angular/forms';

/**
 * Stellt das Tastatur-Spiel und die dazugehörige Bestenliste dar.
 */
@Injectable({
  providedIn: 'root'
})
@Component({
    selector: 'app-stopwatch',
    imports: [FormsModule, CommonModule],
    templateUrl: './stopwatch.component.html',
    styleUrl: './stopwatch.component.css'
})
export class StopwatchComponent implements OnDestroy {
  @Output() reset = new EventEmitter<true>;
  
  @Input() keyboard = new Keyboard();
  
  gameInfoText: string = StopwatchService.gameDescriptionText;
  buttonText: string = StopwatchService.buttonStartText;
  timeText: string = "";
  remainingText: string = "";
  highscoreText: string = "";
  uploadHighscoreText: string = StopwatchService.uploadHighscoreText;
  downloadHighscoreText: string = StopwatchService.downloadHighscoreText;
  downloadHighscoreHref: SafeUrl = "";
  
  running: boolean = false;
  counter: number = 0;
  timerRef: any;
  
  highscores: Highscore[];
  highscore?: Highscore;
  playerName: string = "";
  
  keysRemaining: Key[] = this.keyboard.keys.filter((k: Key) => k.visible != false);
  numberOfKeysRemaining: number = this.keysRemaining.length;
  
  errorName: boolean = false;
  namePlaceholderText: string = "Name";
  
  /**
   * Erzeugt eine Instanz des Spiels. Lädt alle Highscores aus dem LocalStorage.
   * @param sanitizer Für die Erstellung einer SafeUrl zum Herunterladen der Highscores-JSON.
   */
  constructor(private sanitizer: DomSanitizer) {
    this.highscores = JSON.parse(localStorage.getItem('highscores') ?? "[]");
    this.updateHighscores();
  }

  /**
   * Liest LocalStorage ab, um die Liste an Highscores zu erstellen.
   * @param newHighscore Neu zu speichernder Highscore.
   */
  updateHighscores(newHighscore?: Highscore) {
    if (newHighscore) {
      // this.highscores.filter() funktioniert einfach nicht...
      /*
      let newList = this.highscores.filter((highscore: Highscore) => 
        (highscore.keyboardString != newHighscore.keyboardString && highscore.name != newHighscore.name)
      );
      */
      let newList: Highscore[] = [];
      this.highscores.forEach((highscore: Highscore) => {
        if (highscore.keyboardString != newHighscore.keyboardString || highscore.name != newHighscore.name) {
          newList.push(highscore);
        }
      });
      newList.push(newHighscore);
      this.highscores = newList;
    }
    this.highscores.sort((a, b) =>
      a.keyboardString.localeCompare(b.keyboardString) || a.score - b.score
    );

    let highscoresJson = JSON.stringify(this.highscores);
    localStorage.setItem('highscores', highscoresJson);
    this.downloadHighscoreHref = this.generateDownloadUri(highscoresJson);
  }

  /**
   * Generiert eine URI, mit dem man ein JSON-Objekt herunterladen kann.
   * @param json Das herunterzuladende JSON-Objekt.
   * @returns Die URI zum Herunterladen.
   */
  generateDownloadUri(json: string): SafeUrl {
    let uri: SafeUrl = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
    return uri;
  }

  /**
   * Sucht nach einem Highscore aus der Liste an Highscores.
   * @param keyboardString Identifier der Tastatur.
   * @param playerName Name des Spielers.
   * @returns Den gefundenen Highscore, wenn vorhanden.
   */
  findHighscore(keyboardString: string, playerName: string): Highscore | undefined {
    let ret: Highscore | undefined;

    if (this.highscores.entries() == undefined) {
      return ret;
    }

    // this.highscores.filter() funktioniert einfach nicht...
    this.highscores.forEach((highscore: Highscore) => {
      if (highscore.keyboardString == keyboardString && highscore.name == playerName) {
        ret = highscore;
      }
    });

    return ret;
  }

  /**
   * Überprüfen der Namenseingabe.
   * @returns `true`, wenn erfolgreich, sonst `false`.
   */
  isNameValid(): boolean {
    let checkName = this.playerName;
    let nameFormControl = new FormControl(checkName, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ'\ \-]+$"), Validators.maxLength(20)]);

    this.errorName = true;

    this.playerName = "";
    if (nameFormControl.hasError('required')) {
      this.namePlaceholderText = StopwatchService.nameRequiredErrorText;
    } else if (nameFormControl.hasError('pattern')) {
      this.namePlaceholderText = StopwatchService.nameInvalidErrorText;
    } else if (nameFormControl.hasError('maxlength')) {
      this.namePlaceholderText = StopwatchService.nameTooLongErrorText;
    } else {
      this.errorName = false;
      this.playerName = checkName;
      this.namePlaceholderText = StopwatchService.nameInputText;
      return true;
    }
    return false;
  }

  /**
   * Lädt eine Highscore-Datei hoch und ersetzt die Highscore-Liste mit dessen Inhalt.
   * @param event Die Datei.
   */
  async uploadHighscores(event: any) {
    const file: File = event.target.files[0];
    let json: string = await file.text();
    this.highscores = JSON.parse(json);
    this.updateHighscores();
  }

  /**
   * Startet/stoppt das Spiel bei Klick auf den Start-Knopf.
   * @returns Bricht ab, wenn der Name ungültig ist.
   */
  startStopGame() {
    if (! this.isNameValid()) return;
    
    if (this.running = !this.running) {
      this.startGame()
    } else {
      this.stopGame();
      this.resetText();
    }
  }

  /**
   * Startet das Spiel. Initialisiert Variablen.
   */
  startGame() {
    this.reset.emit();
    this.resetText();

    this.timeText = this.scoreToString(0);
    this.buttonText = StopwatchService.buttonCancelText;
    
    const startTime = Date.now();
    this.timerRef = setInterval(() => {
      this.counter = Date.now() - startTime;
      this.timeText = this.scoreToString(this.counter);
    });
    
    this.highscore = this.findHighscore(this.keyboard.toString(), this.playerName);
    if (! this.highscore) {
      this.highscoreText = "";
    } else {
      this.highscoreText = StopwatchService.highscoreText + this.scoreToString(this.highscore.score);
      this.gameInfoText = this.highscoreText;
    };
    this.updateKeysRemaining();
    
    this.remainingText = StopwatchService.remainingText[0] + this.numberOfKeysRemaining + StopwatchService.remainingText[1];
  }

  /**
   * Stoppt das Spiel. Setzt Variablen zurück.
   */
  stopGame() {
    this.running = false;
    this.buttonText = StopwatchService.buttonStartText;
    this.counter = 0;
    clearInterval(this.timerRef);
  }

  /**
   * Prüfen, ob genug Tasten gedrückt wurden, um das Spiel zu beenden. Die Fn- und Druck-Taste werden ignoriert, da sie kein brauchbares Keydown-Event erzeugen können.
   * @returns Bricht ab, wenn das Spiel nicht aktiv ist.
   */
  checkWin() {
    if (! this.running) return;
    this.updateKeysRemaining();
    
    if (this.numberOfKeysRemaining <= 2 && this.keysRemaining.every((k: Key) => (k.code == "Function" || k.code == "Print"))) {
      let score = this.counter;
      this.stopGame();

      this.timeText = this.scoreToString(score) + (this.highscoreText ? StopwatchService.separator + this.highscoreText : "");
      this.buttonText = StopwatchService.buttonRetryText;
      this.remainingText = StopwatchService.winText + this.scoreToString(score);
      this.gameInfoText = StopwatchService.gameDescriptionText;
      
      if (score < (this.highscore?.score ?? Number.POSITIVE_INFINITY)) {
        if (this.highscore?.score) {
          this.gameInfoText = StopwatchService.oldHighscoreText + this.scoreToString(this.highscore.score);
        }

        this.highscore = new Highscore(this.keyboard.toString(), score, this.playerName);
        this.updateHighscores(this.highscore);

        this.remainingText = StopwatchService.newHighscoreText;
        this.timeText = this.scoreToString(score);
      }
    } else {
      this.remainingText = StopwatchService.remainingText[0] + this.numberOfKeysRemaining + StopwatchService.remainingText[1];
    }
  } 
  
  /**
   * Rücksetzen aller Texte bzgl. des laufenden Spiels.
   */
  resetText() {
    this.gameInfoText = StopwatchService.gameDescriptionText;
    this.highscoreText = "";
    this.remainingText = "";
    this.timeText = "";
  }

  /**
   * Guckt, wie viele Tasten noch gedrückt werden müssen.
   */
  updateKeysRemaining() {
    this.keysRemaining = this.keyboard.keys.filter((k: Key) => k.visible != false && k.keydown == false && k.keyup == false);
    this.numberOfKeysRemaining = this.keysRemaining.length;
  }

  /**
   * Zur Darstellung des Datums in der Bestzeiten-Tabelle.
   * @param unix Zeit seit Unix-Epoche. Die Zeit, wann der Highscore aufgestellt wurde, wird so gespeichert.
   * @returns Einen LocaleString.
   */
  date(unix: number|undefined) {
    return new Date(unix ?? 0).toLocaleString();
  }
  
  /**
   * Zur Darstellung eines Scores in lesbarer Form.
   * @param score Der Score in ms.
   * @returns Den Score im Format min:s:ms.
   */
  scoreToString(score: number): string {
    let min: string = Math.floor(score / 60000).toString().padStart(2, "0");
    let s: string = Math.floor(score / 1000).toString().padStart(2, "0");
    let ms: string = (score % 1000).toString().padStart(3, "0");
    return `${min}:${s}:${ms}`
  }

  /**
   * Beende das Spiel.
   */
  ngOnDestroy() {
    this.stopGame();
  }
}
