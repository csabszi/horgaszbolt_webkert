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
import { Message } from '../../shared/models/message.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      category: ['', Validators.required],
      message: ['', Validators.required],
      preferredDate: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  send() {
    if (this.contactForm.valid) {
      this.isLoading = true;

      const rawDate = this.contactForm.get('preferredDate')?.value;

      const newMessage: Message = {
        name: this.contactForm.get('name')?.value || '',
        email: this.contactForm.get('email')?.value || '',
        message: this.contactForm.get('message')?.value || '',
        category: this.contactForm.get('category')?.value as 'Panasz' | 'Észrevétel' | 'Hibabejelentés' | 'Termék',
        sentDate: rawDate ? new Date(rawDate) : new Date()
      };


      const storedMessages: Message[] = JSON.parse(localStorage.getItem('messages') || '[]');
      storedMessages.push(newMessage);
      localStorage.setItem('messages', JSON.stringify(storedMessages));

      setTimeout(() => {
        alert('Üzenet elküldve!');
        this.contactForm.reset();
        this.isLoading = false;
      }, 1500);
    }
  }


}