import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MensajesService } from '../services/mensajes.service';
import { CorreoService } from '../services/correo.service';
import { RecuperarService } from './recuperar.service';
import { API_URL } from '../app.config';

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
    private recuperarService: RecuperarService, // Injecting the service
    private correoService: CorreoService
  ){}

  agregarMsj() {
    this.recoverPassword();
  }

  recoverPassword() {
    // if (this.valido) {
      this.recuperarService.recoverPassword(this.correo).subscribe({
        next: (response) => {
          const token = response; // Ensure token is treated as a string
          const link = `${API_URL}/web/recuperar-contrasena/${token}`;
          // this.agregarMsj();
          console.log('Token received:', token);
          // Send recovery email with link containing the token
          const subject = 'Recuperación de Contraseña';
          const body = `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
              <h1 style="text-align: center; color: #3498db;">Recuperación de Contraseña</h1>
              <p>Hemos recibido tu solicitud para recuperar tu contraseña. Para establecer una nueva contraseña, por favor, haz clic en el siguiente enlace:</p>
              <p style="text-align: center;">
                  <a href="${link}" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Restablecer Contraseña</a>
              </p>
              <p>Si no solicitaste esta recuperación, por favor, ignora este mensaje.</p>
              <p>Gracias por usar nuestra aplicación,</p>
              <p style="font-weight: bold;">El equipo de SOS</p>
              <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
              <p style="font-size: 12px; color: #999; text-align: center;">
                  Por favor, no respondas a este correo.
              </p>
          </div>
      `;
      

          // const body = `Haga clic en el siguiente enlace para recuperar su contraseña:`
          // const link = `http://localhost:59755/recuperar-contrasena/${token}`;
          this.correoService.sendCorreo(this.correo, subject, body).subscribe({
            next:() => {
              console.log('Email sent successfully');
              this.mensajesService.agregarMensaje("Correo enviado. Revise su bandeja de entrada o la carpeta de SPAM");
              setTimeout(() => {
                this.mensajesService.agregarMensaje("");
              }, 5000);
            },
            error:(error) => {
              console.error('Error sending email:', error);
            }
        });
        },
        error: (error) => {
          console.error('Error during password recovery:', error);
        }
    });
    // }
  }

//   sendEmail(correo: any) {

//     const to= correo;
//     const subject= ' Confirmación de Cambio de Contraseña en SOS';
//     // const  body= 'Cambio de Contraseña Confirmado'
//     const body = `
//     <h1>Cambio de Contraseña Confirmado</h1>
//     <p>Hola,</p>
//     <p>Tu solicitud de cambio de contraseña ha sido recibida y procesada con éxito. Para completar el proceso y establecer tu nueva contraseña, por favor, haz clic en el siguiente enlace:</p>
//     <p style="text-align: center;">
//         <a href="www" style="background-color: #3498db; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Restablecer Contraseña</a>
//     </p>
//     <p>Este enlace será válido por un tiempo limitado, así que asegúrate de usarlo lo antes posible.</p>
//     <p>Si no solicitaste este cambio, por favor, ignora este mensaje.</p>
//     <p>Gracias por usar nuestra aplicación,</p>
//     <p>El equipo de SOS</p>
// `;


//     this.correoService.sendCorreo(to, subject, body).subscribe({
//       next: (response) => {
//         console.log(response);
//         // alert(response);
//         this.mensajesService.agregarMensaje("Correo enviado. Revise su bandeja de entrada o la carpeta de SPAM");
//         setTimeout(() => {
//           this.mensajesService.agregarMensaje("");
//         }, 5000);
//       },
//       error: (error) => {
//         console.error(error);
//         // alert(error);
//       }
//     });
//   }

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
