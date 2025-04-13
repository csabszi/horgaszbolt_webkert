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
import { CartSummaryComponent } from '../../shared/cart-summary/cart-summary.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CartSummaryComponent],
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
      const formData = this.orderForm.value;

      const previousOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const newOrder = {
        form: formData,
        items: this.cartItems,
        date: new Date()
      };
      previousOrders.push(newOrder);
      localStorage.setItem('orders', JSON.stringify(previousOrders));

      const savedProducts = localStorage.getItem('products');
      if (savedProducts) {
        const products = JSON.parse(savedProducts);
        this.cartItems.forEach(cartItem => {
          const prod = products.find((p: any) => p.id === cartItem.product.id);
          if (prod) {
            prod.amount -= cartItem.quantity;
            if (prod.amount < 0) prod.amount = 0;
          }
        });
        localStorage.setItem('products', JSON.stringify(products));
      }

      this.cartService.clearCart();
      this.cartItems = [];

      alert('Rendelés sikeresen elküldve!');
      this.orderForm.reset();
    } else {
      alert('Kérlek tölts ki minden kötelező mezőt!');
    }
  }


  onClearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }
}