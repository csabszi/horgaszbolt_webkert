import { Injectable } from '@angular/core';
import { CartItem } from './models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: CartItem[] = [];

  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(item: CartItem) {
    const existing = this.cart.find(c => c.product.id === item.product.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
  }

  clearCart() {
    this.cart = [];
  }
}