import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

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
export class LoginComponent {
  isLoading = false;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    const email: string = this.loginForm.get('email')?.value;
    const password: string = this.loginForm.get('password')?.value;

    try {
      await this.authService.signIn(email, password);
      this.authService.updateLoginStatus(true);
      this.router.navigate(['/home']);
    } catch (error) {
      let message = 'Ismeretlen hiba történt.';

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'Hibás email cím formátum.';
            break;
          case 'auth/user-not-found':
            message = 'A megadott email címhez nem tartozik felhasználó.';
            break;
          case 'auth/wrong-password':
            message = 'Helytelen jelszó.';
            break;
          case 'auth/too-many-requests':
            message = 'Túl sok próbálkozás. Próbáld újra később.';
            break;
        }
      }

      alert(message);
    } finally {
      this.isLoading = false;
    }
  }

}
