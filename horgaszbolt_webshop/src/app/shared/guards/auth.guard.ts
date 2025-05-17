import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (user) {
        return true;
      }

      console.log('Hozzáférés megtagadva – Nincs bejelentkezve');
      router.navigate(['/login']);
      return false;
    })
  );
};

export const publicGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.currentUser.pipe(
    take(1),
    map(user => {
      if (!user) {
        return true;
      }

      console.log('Már be vagy jelentkezve – Átirányítás a kezdőlapra');
      router.navigate(['/home']);
      return false;
    })
  );
};