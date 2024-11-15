import { Injectable } from '@angular/core';

/**
 * Speichert fürs Tastatur-Spiel relevante Textfetzen.
 */
@Injectable({
  providedIn: 'root'
})
export class StopwatchService {
  static readonly buttonStartText: string = "Start!";
  static readonly buttonCancelText: string = "Abbrechen";
  static readonly buttonRetryText: string = "Neuer Versuch";
  static readonly winText: string = "Geschafft! Zeit: ";
  static readonly highscoreText: string = "Bestzeit: ";
  static readonly gameDescriptionText: string = "Teste dein Geschick! Wie schnell kannst du alle Tasten oben drücken?";
  static readonly newHighscoreText = "Neue Bestzeit! ";
  static readonly downloadHighscoreText: string = "Bestzeiten<br>herunterladen";
  static readonly uploadHighscoreText: string = "Bestzeiten<br>hochladen";
  static readonly oldHighscoreText: string = "Alte Bestzeit: ";
  static readonly separator: string = " | ";
  static readonly remainingText: string[] = ["Noch ", " Tasten"];
  static readonly nameInputText: string = "Name";
  static readonly nameRequiredErrorText: string = "Name ist Pflichtangabe.";
  static readonly nameInvalidErrorText: string = "Name enthält ungültige Zeichen.";
  static readonly nameTooLongErrorText: string = "Name zu lang! Max. 20 Zeichen.";
}
