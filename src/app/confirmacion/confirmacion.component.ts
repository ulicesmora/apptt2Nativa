import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatosService } from '../services/datos.service';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-confirmacion',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './confirmacion.component.html',
  styleUrl: './confirmacion.component.css'
})
export class ConfirmacionComponent {

  get datos() {
    return this.datosService.datos;
  }

  get mensajes() {
    return this.mensajesService.mensajes;
  }

  constructor(
    private datosService: DatosService,
    private mensajesService: MensajesService,
    public _matDialogRef: MatDialogRef<ConfirmacionComponent>
  ) {}

  agregarMsj() {
    this.mensajesService.agregarMensaje("Cuenta creada. Revise su correo electrónico");
    setTimeout(() => {
      this.mensajesService.agregarMensaje("");
    }, 3000);
  }

  onNoClick(): void {
    this._matDialogRef.close();  
    this.datosService.eliminarDatos();
  }
}
