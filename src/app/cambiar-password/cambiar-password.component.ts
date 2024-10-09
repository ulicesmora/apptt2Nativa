import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {
  mensajePassActual=false;
  mensajePass=false;
  mensajeGeneral=false;
  passActual='';
  passNueva='';
  passNuevar='';

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }
  constructor(public _matDialogRef: MatDialogRef<CambiarPasswordComponent>,
    private mensajesService: MensajesService,
  ){}

  onNoClick(): void {
    this._matDialogRef.close();  
  }

  validarPass(valor:string) {
    if(valor.length == 0 || valor.length<8 || valor.length>16) {
      return true;
    } else {
      return false;
    }
  }

  agregarMsj() {
    this.mensajesService.agregarMensaje("Contraseña cambiada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }
  // validar() {
  //   if(!this.mensajePass || !this.mensajePassActual || !this.mensajeGeneral || this.passNueva==this.passNuevar) {
  //     this._matDialogRef
  //   }
  // }
}
