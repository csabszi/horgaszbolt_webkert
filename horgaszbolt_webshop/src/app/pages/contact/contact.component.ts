import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service';
import { Message } from '../../shared/models/message.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ]
})
export class ContactComponent {
  isLoading = false;
  contactForm;

  constructor(
    private fb: FormBuilder,
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.contactForm = this.fb.group({
      category: ['', Validators.required],
      message: ['', Validators.required],
      preferredDate: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  send() {
    if (this.contactForm.invalid) return;

    this.isLoading = true;

    this.authService.currentUser.pipe(take(1)).subscribe(user => {
      if (!user) {
        alert('Be kell jelentkezned az üzenet küldéséhez.');
        this.isLoading = false;
        return;
      }

      const msg: Message = {
        userId: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        message: this.contactForm.get('message')?.value || '',
        category: this.contactForm.get('category')?.value as 'Panasz' | 'Észrevétel' | 'Hibabejelentés' | 'Termék',
        sentDate: new Date()
      };

      const messagesRef = collection(this.firestore, 'Messages');
      addDoc(messagesRef, msg).then(() => {
        alert('Üzenet sikeresen elküldve!');
        this.contactForm.reset();
      }).catch(error => {
        console.error('Hiba az üzenet mentésekor:', error);
        alert('Hiba történt az üzenet elküldésekor. Próbáld újra később.');
      }).finally(() => {
        this.isLoading = false;
      });
    });
  }
}
