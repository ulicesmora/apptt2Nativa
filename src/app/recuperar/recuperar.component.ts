import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {
  mensajeCorreo = false;
  valido = false;
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  correo='';

  get mensajes() {
    return this.mensajesService.mensajes;
  }

  constructor(
    public _matDialogRef: MatDialogRef<RecuperarComponent>,
    private mensajesService: MensajesService,
  ){}

  agregarMsj() {
    this.mensajesService.agregarMensaje("Correo enviado. Revise su bandeja de entrada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }

  onNoClick(): void {
    this._matDialogRef.close();  
  }

  validarCorreo() {
    if(!this.emailRegex.test(this.correo)) {
      return this.mensajeCorreo=true;
    } else {
      this.valido=true;
      return this.mensajeCorreo=false;
    }
  }
}
