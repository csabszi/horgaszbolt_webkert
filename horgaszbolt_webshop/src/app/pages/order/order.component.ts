import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CartService } from '../../shared/cart.service';
import { CartItem } from '../../shared/models/cart-item.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  cartItems: CartItem[] = [];

  constructor(private fb: FormBuilder, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();

    this.orderForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      email: ['', [Validators.required, Validators.email]],
      comment: ['']
    });
  }

  submitOrder() {
    if (this.orderForm.valid) {
      console.log('Form:', this.orderForm.value);
      console.log('Kosár:', this.cartItems);
      alert('Rendelés sikeresen elküldve!');
      this.cartService.clearCart();
      this.orderForm.reset();
    } else {
      alert('Kérlek tölts ki minden kötelező mezőt!');
    }
  }
}