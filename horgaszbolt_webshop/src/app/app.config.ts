import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: "horgaszbolt-e1a41",
        appId: "1:135553876795:web:ac0a1bc598a89fcfbf2d1e",
        storageBucket: "horgaszbolt-e1a41.firebasestorage.app",
        apiKey: "AIzaSyDAAEoHZd5w8jQ7LJybJ6X_PYo-GP31scc",
        authDomain: "horgaszbolt-e1a41.firebaseapp.com",
        messagingSenderId: "135553876795"
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ]
};