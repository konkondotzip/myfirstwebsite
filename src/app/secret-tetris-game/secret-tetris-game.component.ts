import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-secret-tetris-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './secret-tetris-game.component.html',
  styleUrl: './secret-tetris-game.component.css'
})
export class SecretTetrisGameComponent implements OnDestroy {

  playerSelect: boolean = true;
  playerName: string = "";

  I: { shape: number[][], name: string } = {
    shape:
      [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
    name: "I"
  }
  J: { shape: number[][], name: string } = {
    shape:
      [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
    name: "J"
  }
  L: { shape: number[][], name: string } = {
    shape:
      [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
      ],
    name: "L"
  }
  O: { shape: number[][], name: string } = {
    shape:
      [
        [1, 1],
        [1, 1]
      ],
    name: "O"
  }
  S: { shape: number[][], name: string } = {
    shape:
      [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
      ],
    name: "S"
  }
  T: { shape: number[][], name: string } = {
    shape:
      [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
      ],
    name: "T"
  }
  Z: { shape: number[][], name: string } = {
    shape:
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
    name: "Z"
  }

  qrMode: boolean = false;
  qrProgress: number = 0;

  boardWidth: number = 10;
  boardHeight: number = 20;
  board: number[][] = [];
  frozenBoard: number[][] = [];

  checkName() {
    console.log(this.playerName);
    if (this.playerName == "Wordolf") {
      this.qrMode = true;
      this.boardWidth = 21;
      this.boardHeight = 21;
    } else if (this.playerName == "") {
      this.playerName = "Player";
    }
    this.playerSelect = false;
    this.initBoard();
  }

  QR: { shape: number[][], progress: number[][] } = {
    shape:
      [
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
        [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1]
      ],
    progress: Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0))
  };

  shapes: number[][][] = [
    this.I.shape,
    this.J.shape,
    this.L.shape,
    this.O.shape,
    this.S.shape,
    this.T.shape,
    this.Z.shape
  ];

  pulledShapes: number[] = [];

  currentPiece: { shape: number[][], x: number, y: number, rotation: number } = {
    shape: [], x: 3, y: 0, rotation: 0
  };
  nextPiece: { shape: number[][] } = { shape: [] }
  nextPieceDisplay: number[][] = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

  running: boolean = false;
  paused: boolean = false;
  gameOver: boolean = false;
  timer: any;
  hardDropCooldown: boolean = false;
  pauseCooldown: boolean = false;
  hardDropCooldownDuration: number = 200;
  pauseCooldownDuration: number = 1000;

  linesCleared: number = 0;

  canSpin: boolean = true;

  title: string = "Super Secret Tetris Game";
  enterNameText: string = "Username";
  nameBtnText: string = "Enter";
  startBtnText: string = "Start";
  pauseBtnText: string = "Pause";
  pausedText: string = "Game Paused!";
  gameOverText: string = "Game Over!";
  gameOverNameText: string = "PLAYER NAME:"
  nextText: string = "NEXT:";
  linesText: string = "LINES:";
  progressText: string = "PROGRESS:";
  controlsText: string = "[←][↓][→]: Move, [↑]: Drop, [A][S]: Rotate";

  getRandomShape(): number[][] {
    let randomIndex = Math.floor(Math.random() * this.shapes.length);
    let ret = this.shapes[randomIndex];

    if (!this.pulledShapes.includes(randomIndex)) {
      this.pulledShapes.push(randomIndex);
    } else if (this.pulledShapes.length >= this.shapes.length) {
      this.pulledShapes = [];
    } else {
      ret = this.getRandomShape();
    }
    return ret;
  }

  makeDisplayShape() {
    this.nextPieceDisplay = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    for (let y = 0; y < this.nextPiece.shape.length; y++) {
      for (let x = 0; x < this.nextPiece.shape[y].length; x++) {
        if (this.nextPiece.shape[y][x]) {
          this.nextPieceDisplay[y][x] = this.nextPiece.shape[y][x];
        }
      }
    }
  }

  initBoard() {
    /* das hier geht nicht, weil dadurch alle 20 zeilen mit DERSELBEN referenz `Array(10).fill(0)` gefüllt werden;
    * also sind dadurch alle zeilen gleich:
    this.board = Array(this.boardHeight).fill(Array(this.boardWidth).fill(0));
    * diese methode erzeugt für jede zeile eine eigene referenz:
    */
    this.board = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0));
    this.frozenBoard = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0));
    if (this.qrMode && !this.gameOver) {
      this.QR.progress = Array.from({ length: this.boardHeight }, () => Array(this.boardWidth).fill(0));
      this.qrProgress = 0;
    }
    this.nextPieceDisplay = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
  }

  startStopGame() {
    if (!this.running) {
      this.startGame();
    } else {
      this.stopGame();
    }
  }
  
  startGame() {
    this.running = true;
    this.gameOver = false;
    this.paused = false; 
    this.startBtnText = "Quit";
    if (this.qrMode) {
      for (let i = 0; i < this.qrProgress; i++) {
        this.QR.progress[i] = this.QR.shape[i];
      }
    }
    this.pauseBtnText = "Pause";
    this.pulledShapes = [];
    this.nextPiece.shape = this.getRandomShape();
    this.initBoard();
    this.spawnPiece();
    this.timer = setInterval(() => { this.moveDown(); }, 500);
  }
  
  stopGame() {
    this.running = false;
    this.paused = false;
    this.startBtnText = "Start";
    clearInterval(this.timer);
    this.initBoard();
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  pauseGame() {
    if (this.pauseCooldown) return;

    if (!this.paused) {
      this.paused = true;
      this.pauseBtnText = "Resume";
      clearInterval(this.timer);
      this.pauseCooldown = true;
      setTimeout(() => {
        this.pauseCooldown = false;
      }, this.pauseCooldownDuration);
    } else {
      this.paused = false;
      this.pauseBtnText = "Pause";
      this.timer = setInterval(() => { this.moveDown(); }, 500);
    }
  }

  updateBoard() {
    // Das jetzige Spielfeld ersetzen
    for (let y = 0; y < this.board.length; y++) {
      for (let x = 0; x < this.board[y].length; x++) {
        this.board[y][x] = this.frozenBoard[y][x];
      }
    }
    
    // Den jetzigen Stein auf das Spielfeld platzieren
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x]) {
          this.board[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
        }
      }
    }


  }

  /**
   * Platziert den jetzigen Stein ins frozenBoard-Array. Aufrufen, wenn ein Stein abgesetzt wird.
   */
  freezePiece(): void {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (this.currentPiece.shape[y][x]) {
          this.frozenBoard[this.currentPiece.y + y][this.currentPiece.x + x] = this.currentPiece.shape[y][x];
        }
      }
    }
  }

  /**
   * Guckt, ob der Stein eine Kollision hervorrufen würde, BEVOR er sich dorthin bewegt.
   * Die Offsets sind nur fürs Bewegen und nicht fürs Drehen des Steins relevant.
   */
  checkCollision(offsetX: number, offsetY: number): boolean {
    for (let y = 0; y < this.currentPiece.shape.length; y++) {
      for (let x = 0; x < this.currentPiece.shape[y].length; x++) {
        if (
          this.currentPiece.shape[y][x] && (
            (this.frozenBoard[this.currentPiece.y + y + offsetY] &&
             this.frozenBoard[this.currentPiece.y + y + offsetY][this.currentPiece.x + x + offsetX]) !== 0
          )
        ) {
          return true;
        }
      }
    }
    return false;
  }

  clearLines() {
    for (let y = 0; y < this.frozenBoard.length; y++) {
      if (this.frozenBoard[y].every(x => x)) {
        this.linesCleared += 1;
        if (this.qrMode && y == this.boardHeight - 1) {
          this.QR.progress[this.qrProgress] = JSON.parse(JSON.stringify(this.QR.shape[0]));
          this.frozenBoard.pop();          
          this.frozenBoard.push(this.QR.shape.shift() ?? Array(this.boardWidth).fill(0));

          this.qrProgress += 1;
        } else {
          this.frozenBoard.splice(y, 1);
          this.frozenBoard.unshift(Array(this.boardWidth).fill(0));
        }
      }
    }
  }

  spawnPiece() {
    this.currentPiece.y = 0;
    this.currentPiece.x = Math.floor(this.boardWidth / 2 - 1.5);
    if (this.currentPiece.shape.length == 2) this.currentPiece.x += 1;

    this.currentPiece.shape = this.nextPiece.shape;
    this.nextPiece.shape = this.getRandomShape();

    if (this.checkCollision(0, 0)) {
      // Game Over
      this.gameOver = true;
      this.startBtnText = "Retry";
      this.stopGame();
    } else {
      this.makeDisplayShape();
      this.updateBoard();
    }

  }

  moveDown() {
    if (!this.checkCollision(0, 1)) {
      this.currentPiece.y += 1;
      this.updateBoard();
    } else {
      this.freezePiece();
      this.clearLines();
      this.spawnPiece();
    }
  }

  hardDrop() {
    if (this.hardDropCooldown) return;

    while (!this.checkCollision(0, 1)) {
      this.currentPiece.y += 1;
    }
    this.freezePiece();
    this.clearLines();
    this.spawnPiece();

    this.hardDropCooldown = true;
    setTimeout(() => {
      this.hardDropCooldown = false;
    }, this.hardDropCooldownDuration);
  }

  moveLeft() {
    if (!this.checkCollision(-1, 0)) {
      this.currentPiece.x -= 1;
      this.updateBoard();
    }
  }

  moveRight() {
    if (!this.checkCollision(1, 0)) {
      this.currentPiece.x += 1;
      this.updateBoard();
    }
  }

  rotateRight() {
    this.currentPiece.shape = this.currentPiece.shape[0].map(
      (val, index) => this.currentPiece.shape.map(row => row[index]).reverse());
    if (!this.checkCollision(0, 0)) {
      this.updateBoard();
    } else {
      this.rotateLeft();
    }
  }

  rotateLeft() {
    this.currentPiece.shape = this.currentPiece.shape[0].map(
      (val, index) => this.currentPiece.shape.map(row => row[row.length - 1 - index]));
    if (!this.checkCollision(0, 0)) {
      this.updateBoard();
    } else {
      this.rotateRight();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.paused) return;
    if (!this.running) return;

    switch (event.code) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveDown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.hardDrop();
        break;
      case 'KeyA':
        this.rotateLeft();
        break;
      case 'KeyS':
        this.rotateRight();
        break;
      case 'ShiftLeft':
        // Todo (optional): Inventar
        break;
    }
  }
}
