import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        password1: ['', [Validators.required, Validators.minLength(6)]],
        password2: ['', Validators.required]
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  passwordsMatchValidator(form: FormGroup) {
    const pw1 = form.get('password1')?.value;
    const pw2 = form.get('password2')?.value;
    return pw1 === pw2 ? null : { passwordsMismatch: true };
  }

  async register(): Promise<void> {
    if (this.registerForm.invalid) return;

    const { email, name, password1 } = this.registerForm.value;

    this.isLoading = true;

    const userData: Partial<User> = {
      email,
      name
    };

    try {
      await this.authService.register(email, password1, userData);
      this.authService.updateLoginStatus(true);
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Regisztrációs hiba:', error);

      let errorMsg = 'Ismeretlen hiba történt.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMsg = 'Ez az email cím már használatban van.';
          break;
        case 'auth/invalid-email':
          errorMsg = 'Hibás email formátum.';
          break;
        case 'auth/weak-password':
          errorMsg = 'A jelszó túl gyenge. Legalább 6 karakter kell.';
          break;
      }

      alert(errorMsg);
    } finally {
      this.isLoading = false;
    }
  }
}