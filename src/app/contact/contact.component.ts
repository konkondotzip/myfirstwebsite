import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name: string = "";
  email: string = "";
  message: string = "";
  errorName: boolean = false;
  errorEmail: boolean = false;
  errorMessage: boolean = false;
  errorNameTxt: string = "&nbsp;";
  errorEmailTxt: string = "&nbsp;";
  errorMessageTxt: string = "&nbsp;";

  
  submission() {
    let nameFormControl = new FormControl(this.name, [Validators.required, Validators.pattern("^[A-Za-zÀ-ÖØ-öø-ÿ'\ \-]+$")]);
    let emailFormControl = new FormControl(this.email, [Validators.required, Validators.email]);
    let messageFormControl = new FormControl(this.message, [Validators.required]);

    if (nameFormControl.hasError('pattern') && !nameFormControl.hasError('required')) {
      this.errorName = true;
      this.errorNameTxt = "Ungültige Eingabe. Erlaubt: Buchstaben, Leerzeichen, - und '";
    } else if (nameFormControl.hasError('required')) {
      this.errorName = true;
      this.errorNameTxt = "Name ist Pflichtangabe.";
    } else {
      this.errorName = false;
      this.errorNameTxt = "&nbsp;";
    }
    
    if (emailFormControl.hasError('email') && !emailFormControl.hasError('required')) {
      this.errorEmail = true;
      this.errorEmailTxt = "Ungültige E-Mail-Adresse.";
    } else if (emailFormControl.hasError('required')) {
      this.errorEmail = true;
      this.errorEmailTxt = "E-Mail ist Pflichtangabe.";
    } else {
      this.errorEmail = false;
      this.errorEmailTxt = "&nbsp;";
    }

    if (messageFormControl.hasError('required')) {
      this.errorMessage = true;
      this.errorMessageTxt = "Nachricht ist Pflichtangabe.";
    } else {
      this.errorMessage = false;
      this.errorMessageTxt = "&nbsp;";
    }

    if (!this.errorName && !this.errorEmail && !this.errorMessage) {
      console.log(this.name, this.email, this.message);
    }
  }
}