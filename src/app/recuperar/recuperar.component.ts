import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export class RecuperarComponent {
  constructor(public _matDialogRef: MatDialogRef<RecuperarComponent>){}

  onNoClick(): void {
    this._matDialogRef.close();  
  }
}
