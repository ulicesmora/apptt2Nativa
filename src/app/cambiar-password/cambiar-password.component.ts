import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cambiar-password',
  standalone: true,
  imports: [],
  templateUrl: './cambiar-password.component.html',
  styleUrl: './cambiar-password.component.css'
})
export class CambiarPasswordComponent {
  constructor(public _matDialogRef: MatDialogRef<CambiarPasswordComponent>){}

  onNoClick(): void {
    this._matDialogRef.close();  
  }
}
