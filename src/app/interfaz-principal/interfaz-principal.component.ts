import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';
import { MensajesService } from '../services/mensajes.service';
import { InicioSesionService } from '../login/inicio-sesion.service';
import { InterfazPrincipalService } from './interfaz-principal.service';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './interfaz-principal.component.html',
  styleUrl: './interfaz-principal.component.css'
})
export class InterfazPrincipalComponent {
  latitude: number | null = null;
  longitude: number | null = null;
  
  //userId: string | null = null;
  userId = localStorage.getItem('id');

  get mensajes() {
    // this.mensajesService.agregarMensaje('Cuenta creada. Revise su correo electrónico');
    return this.mensajesService.mensajes;
  }
  respuesta = false;
  constructor(private _matDialog: MatDialog,
    private mensajesService: MensajesService,
    private interfazPrincipalService: InterfazPrincipalService) {}
  menuLateral():void {
    this._matDialog.open(MenuComponent, {
      width:'800px'
    })
  }

  async solicitud() {
    
    try {
      const position = await this.interfazPrincipalService.getCurrentLocation();
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      // Ahora, envia la ubicación al backend
      this.interfazPrincipalService.actualizarStatus(this.userId ,'true',this.latitude, this.longitude).subscribe(
        (response) => {
          console.log('Location sent successfully:', response);
          this.respuesta=true;
        },
        (error) => {
          console.error('Error sending location:', error);
        }
      );
    } catch (error) {
      console.error('Error getting location:', error);
    }
  }
}
