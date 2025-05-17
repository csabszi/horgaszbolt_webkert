import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';
  showLoginForm = true;
  authSubscription?: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.loginError = 'Kérlek, töltsd ki helyesen az űrlapot.';
      return;
    }

    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';

    this.authService.signIn(email, password)
      .then(userCredential => {
        console.log('Sikeres bejelentkezés:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch((error: FirebaseError) => {
        console.error('Bejelentkezési hiba:', error.code, error.message);
        this.isLoading = false;
        this.showLoginForm = true;

        switch (error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Ilyen felhasználó nem létezik!';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó!';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Helytelen email cím vagy jelszó!';
            break;
          default:
            this.loginError = 'A bejelentkezés során hiba történt!';
        }
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }
}
