import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderData } from '../models/order-data.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class OrderFormComponent {
  @Output() formSubmitted = new EventEmitter<OrderData>();

  orderForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      comment: [''],
    });
  }

  submitForm() {
    if (this.orderForm.valid) {
      const formValue: OrderData = this.orderForm.value;
      this.formSubmitted.emit(formValue);
      this.orderForm.reset();
    } else {
      alert('Kérlek töltsd ki az összes kötelező mezőt!');
    }
  }
}