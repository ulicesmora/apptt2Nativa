import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecuperarComponent } from '../recuperar/recuperar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private _matDialog: MatDialog) {}
  recuperarPassword():void {
    this._matDialog.open(RecuperarComponent, {
      width:'400px'
    })
  }
}
