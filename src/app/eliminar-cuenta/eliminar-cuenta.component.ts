import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-eliminar-cuenta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './eliminar-cuenta.component.html',
  styleUrl: './eliminar-cuenta.component.css'
})
export class EliminarCuentaComponent {
  mensajePassActual=false;
  mensajePass=false;
  mensajeGeneral=false;
  passActual='';

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }

  constructor(public _matDialogRef: MatDialogRef<EliminarCuentaComponent>,
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

  eliminarCuenta() {
    this.mensajesService.agregarMensaje("Contraseña cambiada");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }
}
