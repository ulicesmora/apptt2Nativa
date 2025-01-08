import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthServiceService } from '../../login/auth-service.service';


export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthServiceService); // Inyecta el servicio de autenticación
  const router = inject(Router); // Inyecta el router para redirecciones

  console.log('Guard activado en Android');
  const isAuthenticated = await authService.isAuthenticated();
  console.log('Resultado de isAuthenticated:', isAuthenticated);
  if (!isAuthenticated) {
    console.log('Usuario no autenticado, redirigiendo a login');
    router.navigate(['/login']); // Redirige al login si no está autenticado
    return false;
  }
  console.log('Usuario autenticado, permitiendo navegación');
  return true; // Permite el acceso si está autenticado
};




// import { CanActivateFn, Router } from '@angular/router';
// import { Preferences } from '@capacitor/preferences';
// import { inject } from '@angular/core';

// export const authGuard: CanActivateFn = async (route, state) => {
//   const router = inject(Router);

//   try {
//     const { value: id } = await Preferences.get({ key: 'id' });
//     console.log('Valor recuperado en Guard:', id);

//     if (!id) {
//       console.log('Usuario no autenticado, redirigiendo al login...');
//       router.navigate(['/login']);
//       return false;
//     }

//     console.log('Usuario autenticado');
//     return true;
//   } catch (error) {
//     console.error('Error en el Guard:', error);
//     router.navigate(['/login']);
//     return false;
//   }
// };
