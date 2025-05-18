import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../models/cart-item.model';
import { CurrencyPipe } from '../pipes/currency.pipe';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent {
  @Input() cart: CartItem[] = [];

  @Output() checkoutClicked = new EventEmitter<void>();
  @Output() clearCartClicked = new EventEmitter<void>();

  getTotalQuantity(): number {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice(): number {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  checkout() {
    this.checkoutClicked.emit();
  }

  clearCart() {
    this.clearCartClicked.emit();
  }
}
