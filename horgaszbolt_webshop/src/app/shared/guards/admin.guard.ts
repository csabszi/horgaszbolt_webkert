import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { doc, getDoc, Firestore } from '@angular/fire/firestore';
import { from, map, switchMap } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const firestore = inject(Firestore);

  return authService.currentUser.pipe(
    switchMap(user => {
      if (!user) {
        router.navigate(['/login']);
        return from([false]);
      }

      const userRef = doc(firestore, 'Users', user.uid);
      return from(getDoc(userRef)).pipe(
        map(snapshot => {
          const data = snapshot.data();
          if (data && data['isAdmin'] === true) {
            return true;
          } else {
            console.warn('Hozzáférés megtagadva – Nem admin');
            router.navigate(['/home']);
            return false;
          }
        })
      );
    })
  );
};