import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { InterfazPrincipalComponent } from './interfaz-principal/interfaz-principal.component';
import { EditarInfoComponent } from './editar-info/editar-info.component';
import { ConfirmacionComponent } from './confirmacion/confirmacion.component';
import { authGuard } from './guards/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'interfaz-principal', component: InterfazPrincipalComponent, canActivate: [authGuard]  },
    { path: 'editar-info', component: EditarInfoComponent, canActivate: [authGuard]  },
    { path: 'confirmacion', component: ConfirmacionComponent },
];
