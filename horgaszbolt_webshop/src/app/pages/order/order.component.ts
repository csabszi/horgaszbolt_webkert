import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../../shared/services/cart.service';
import { AuthService } from '../../shared/services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { OrderService } from '../../shared/services/order.service';
import { OrderData } from '../../shared/models/order-data.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  orderForm!: FormGroup;
  cartItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private firestore: Firestore,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      address: ['', Validators.required],
      phone: ['', Validators.required],
      comment: ['']
    });

    this.cartItems = this.cartService.getCart();
  }

  async submitOrder() {
    if (this.orderForm.invalid) {
      alert('Kérlek, tölts ki minden kötelező mezőt!');
      return;
    }

    const authUser = await firstValueFrom(this.authService.currentUser);
    if (!authUser) {
      alert('Nem vagy bejelentkezve!');
      return;
    }

    const userRef = doc(this.firestore, 'Users', authUser.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    const order: Omit<OrderData, 'id' | 'createdAt'> = {
      userId: authUser.uid,
      userEmail: authUser.email ?? '',
      name: userData?.['name'] ?? '',
      address: this.orderForm.value.address,
      phone: this.orderForm.value.phone,
      comment: this.orderForm.value.comment
    };

    try {
      await this.orderService.createOrder(order);
      alert('Rendelés sikeresen elküldve!');
      this.cartService.clearCart();
      this.orderForm.reset();
    } catch (error) {
      console.error('Hiba rendelés mentésekor:', error);
      alert('Hiba történt a rendelés mentése közben.');
    }
  }

  onClearCart() {
    this.cartService.clearCart();
  }
}