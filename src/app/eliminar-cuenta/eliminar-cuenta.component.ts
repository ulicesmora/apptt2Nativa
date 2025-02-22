import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { EliminarCuentaService } from './eliminar-cuenta.service';
import { RouterLink, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-eliminar-cuenta',
  standalone: true,
  imports: [RouterOutlet, RouterLink,CommonModule, FormsModule],
  templateUrl: './eliminar-cuenta.component.html',
  styleUrl: './eliminar-cuenta.component.css'
})
export class EliminarCuentaComponent {
  mensajePassActual=false;
  mensajePass=false;
  mensajeGeneral=false;
  loader = false;
  passActual='';
  userId = Number(localStorage.getItem('id'));
  userPassword = localStorage.getItem('password');

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }

  constructor(public _matDialogRef: MatDialogRef<EliminarCuentaComponent>,
      private mensajesService: MensajesService,
      private eliminarCuentaService: EliminarCuentaService,
      private router: Router,
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
    if(this.passActual!==this.userPassword) {
      this.loader=true;
      setTimeout(() => {
        this.mensajePassActual=true;
        this.loader=false;
      }, 3000);
      setTimeout(() => {
        this.mensajePassActual=false;
      }, 6000);
    } else {
      this.loader=true;
      setTimeout(() => {
        this.loader=false;
        this.onNoClick();
        this.delUser();
      }, 3000);
    }
  }

  delUser (): void {
    this.eliminarCuentaService.deleteUser(this.userId).subscribe({
      next: (response) => {
        console.log('Usuario eliminado:', response);
        localStorage.removeItem('id');
        this.router.navigate(['/login']);
        this.mensajesService.agregarMensaje("Cuenta eliminada correctamente");
        setTimeout(() => {
          this.mensajesService.agregarMensaje("");
        }, 3000);
      },
      error: (error) => {
        console.error('Error al eliminar usuario:', error);
        this.mensajesService.agregarMensaje("Error al eliminar cuenta intentelo más tarde");
        setTimeout(() => {
          this.mensajesService.agregarMensaje("");
        }, 3000);
      }
  });
  }
}
