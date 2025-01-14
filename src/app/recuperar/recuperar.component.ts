import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MensajesService } from '../services/mensajes.service';
import { CorreoService } from '../services/correo.service';

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
    private correoService: CorreoService
  ){}

  agregarMsj() {
    this.sendEmail(this.correo);
  }

  sendEmail(correo: any) {

    const to= correo;
    const subject= ' Confirmación de Cambio de Contraseña en SOS';
    // const  body= 'Cambio de Contraseña Confirmado'
    const body = `
    <h1>Cambio de Contraseña Confirmado</h1>
    <p>Hola,</p>
    <p>Tu solicitud de cambio de contraseña ha sido recibida y procesada con éxito. Para completar el proceso y establecer tu nueva contraseña, por favor, haz clic en el siguiente enlace:</p>
    <p style="text-align: center;">
        <a href="www" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Restablecer Contraseña</a>
    </p>
    <p>Este enlace será válido por un tiempo limitado, así que asegúrate de usarlo lo antes posible.</p>
    <p>Si no solicitaste este cambio, por favor, ignora este mensaje.</p>
    <p>Gracias por usar nuestra aplicación,</p>
    <p>El equipo de SOS</p>
`;


    this.correoService.sendCorreo(to, subject, body).subscribe({
      next: (response) => {
        console.log(response);
        // alert(response);
        this.mensajesService.agregarMensaje("Correo enviado. Revise su bandeja de entrada o la carpeta de SPAM");
        setTimeout(() => {
          this.mensajesService.agregarMensaje("");
        }, 5000);
      },
      error: (error) => {
        console.error(error);
        // alert(error);
      }
    });
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
