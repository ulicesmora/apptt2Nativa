
import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'appMovilTT2';

  constructor(private router: Router) {}

  async ngOnInit() {
    const id = await localStorage.getItem('id');
    if (id) {
      // Si el usuario está autenticado, redirigir a la interfaz principal
      this.router.navigate(['/interfaz-principal']); // Cambia '/home' por la ruta de tu interfaz principal
    } else {
      // Si no está autenticado, redirigir al login
      this.router.navigate(['/login']);
    }
  }
}
