import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RecuperarComponent } from '../recuperar/recuperar.component';
import { MensajesService } from '../services/mensajes.service';
import { FormsModule } from '@angular/forms';
import { InicioSesionService } from './inicio-sesion.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  mensajeCorreo=false;
  mensajePass=false;
  mensajeGeneral=false;
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  correo='';
  password='';
  valido=false;
  isLoginSuccessful: boolean = false; // Bandera para verificar si el inicio de sesión fue exitoso

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }

  constructor(private _matDialog: MatDialog,
    private mensajesService: MensajesService,
    private inicioSesionService: InicioSesionService,
    private router: Router
  ) {}

  recuperarPassword():void {
    this._matDialog.open(RecuperarComponent, {
      width:'400px'
    })
  }

  validarCorreo() {
    if(!this.emailRegex.test(this.correo) || this.correo.length == 0) {
      return this.mensajeCorreo=true;
    } else {
      return this.mensajeCorreo=false;
    }
  }

  validarPass() {
    if(this.password.length == 0) {
      return this.mensajePass=true;
    } else {
      return this.mensajePass=false;
    }
  }

  // loguear() {
  //   if(this.correo.length==0) {
  //     this.mensajeCorreo=true;
  //   } 

  //   if(this.password.length == 0) {
  //     this.mensajePass=true;
  //   } else {
  //     this.mensajePass=false;
  //   }

  //   if(this.mensajeCorreo==true || this.mensajePass==true) {
  //     this.router.navigate(['/login']);
  //   } else {
  //     this.router.navigate(['/interfaz-principal']);
  //   }
  // }

  // loguear() {
  //   this.valido=false
  //   console.log(this.correo, this.password)
  //   let isLoginSuccessful = false; // Bandera para verificar si el inicio de sesión fue exitoso

  //   this.inicioSesionService.login(this.correo, this.password).subscribe({
  //     next: (response) => {
  //       console.log('ID recibido:', response);
    
  //       // Verificar si la respuesta indica éxito
  //       if (response) {
  //         isLoginSuccessful = true; // Establecer la bandera a true si la respuesta es correcta
  //         this.inicioSesionService.setVariable(response.id); // Guardar el ID
  //         this.inicioSesionService.setPassword(response.password); // Guardar la contraseña

  //         console.log('Inicio de sesión exitoso. ID de usuario:', this.inicioSesionService.getVariable());
  //       } else {
  //         console.log('La respuesta no indica un inicio de sesión exitoso.');
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al iniciar sesión:', error);
  //       isLoginSuccessful = false; // Establecer la bandera a false si hubo un error
  //       console.log('El inicio de sesión falló.');
  //       return;
  //     }
  //   });
  //   if(this.correo.length==0) {
  //     this.mensajeCorreo=true;
  //   }else{
  //     this.mensajeCorreo=true;
  //   }

  //   if(this.password.length == 0) {
  //     this.mensajePass=false;
  //   } else {
  //     this.mensajePass=true;
  //   }
  //   if(this.mensajeCorreo==true || this.mensajePass==true) {
  //     console.log(this.mensajeCorreo, this.mensajePass, this.isLoginSuccessful, this.correo, this.password, /* this.inicioSesionService.getVariable() */)
  //     this.router.navigate(['/interfaz-principal']);
  //     console.log()
 
  //   } else {
  //     console.log(this.mensajeCorreo, this.mensajePass, this.isLoginSuccessful, this.correo, this.password, /* this.inicioSesionService.getVariable() */)
  //     this.router.navigate(['/login']);
      
  //   }

  // }

  loguear() {
    this.valido = false;
    console.log(this.correo, this.password);
  
    // Validación previa al envío
    if (this.correo.length == 0) {
      this.mensajeCorreo = true;
    } else {
      this.mensajeCorreo = false;
    }
  
    if (this.password.length == 0) {
      this.mensajePass = true;
    } else {
      this.mensajePass = false;
    }
  
    if (this.mensajeCorreo || this.mensajePass) {
      console.log('Campos vacíos detectados.');
      return; // Detener ejecución si los campos no son válidos
    }
  
    // Llamada al servicio de inicio de sesión
    this.inicioSesionService.login(this.correo, this.password).subscribe({
      next: (response) => {
        console.log('ID recibido:', response);
  
        if (response) {
          // Guardar los datos del usuario si la respuesta es exitosa
          this.inicioSesionService.setVariable(response.id);
          this.inicioSesionService.setPassword(response.password);
          console.log('Inicio de sesión exitoso. ID de usuario:', this.inicioSesionService.getVariable());
  
          // Guardar el token recibido al iniciar sesión
          this.inicioSesionService.saveID(response.id).then(() => {
            console.log('ID guardado correctamente.');
          });
          this.inicioSesionService.savePassword(response.password).then(() => {
            console.log('Password guardado correctamente.');
          });

          // Redirigir a la interfaz principal
          this.router.navigate(['/interfaz-principal']);
        } else {
          console.log('La respuesta no indica un inicio de sesión exitoso.');
          this.router.navigate(['/login']); // Redirigir al login si la respuesta no es exitosa
        }
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        console.log('El inicio de sesión falló.');
        this.router.navigate(['/login']); // Redirigir al login en caso de error
        this.mensajeGeneral=true;
      }
    });
  }

  // loguear() {
  //   this.valido = false;
  
  //   if (this.correo.length == 0 || this.password.length == 0) {
  //     console.log('Campos vacíos detectados.');
  //     this.mensajeCorreo = this.correo.length == 0;
  //     this.mensajePass = this.password.length == 0;
  //     return;
  //   }
  
  //   this.inicioSesionService.login(this.correo, this.password).subscribe({
  //     next: (response) => {
  //       if (response) {
  //         this.inicioSesionService.setVariable(response.id);
  //         this.inicioSesionService.setPassword(response.password);
          
  //         // Guardar token
  //         this.inicioSesionService.saveToken(response.id).then(() => {
  //           console.log('Inicio de sesión exitoso y token guardado.');
  //           this.router.navigate(['/interfaz-principal']); // Redirigir al usuario
  //         });
  //       } else {
  //         console.log('Inicio de sesión fallido.');
  //         this.router.navigate(['/login']);
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al iniciar sesión:', error);
  //       this.router.navigate(['/login']);
  //       this.mensajeGeneral = true;
  //     }
  //   });
  // }
  
  
}
