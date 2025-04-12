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
    MatOptionModule
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
      message: ['', Validators.required]
    });
  }

  send() {
    if (this.contactForm.valid) {
      this.isLoading = true;

      const newMessage: Message = {
        name: this.contactForm.get('name')?.value || '',
        email: this.contactForm.get('email')?.value || '',
        message: this.contactForm.get('message')?.value || '',
        category: this.contactForm.get('category')?.value as 'Panasz' | 'Észrevétel' | 'Hibabejelentés' | 'Termék',
        sentDate: new Date()
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