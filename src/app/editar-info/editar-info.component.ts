import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-editar-info',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './editar-info.component.html',
  styleUrl: './editar-info.component.css'
})
export class EditarInfoComponent {

}
