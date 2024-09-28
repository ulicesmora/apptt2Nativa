import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuComponent } from '../menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interfaz-principal',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './interfaz-principal.component.html',
  styleUrl: './interfaz-principal.component.css'
})
export class InterfazPrincipalComponent {
  respuesta = false;
  constructor(private _matDialog: MatDialog) {}
  menuLateral():void {
    this._matDialog.open(MenuComponent, {
      width:'800px'
    })
  }

  solicitud() {
    this.respuesta=true;
  }
}
