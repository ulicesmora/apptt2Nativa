import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CambiarPasswordComponent } from '../cambiar-password/cambiar-password.component';
import { AuthServiceService } from '../login/auth-service.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(public _matDialogRef: MatDialogRef<MenuComponent>, private _matDialog: MatDialog){}

  onNoClick(): void {
    this._matDialogRef.close();  
  }

  cambiarPassword():void {
    this._matDialog.open(CambiarPasswordComponent, {
      width:'400px'
    })
  }

  // logout() {
  //   this.authService.logout().then(() => {
  //     this.router.navigate(['/login']); // Redirige al login tras cerrar sesión
  //   });
  // }
  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('id');
    console.log('Sesión cerrada.');
  }
}
