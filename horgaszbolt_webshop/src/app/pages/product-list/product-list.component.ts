import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { AuthService } from '../../shared/services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../shared/models/User';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '../../shared/pipes/currency.pipe';
import { CartItem } from '../../shared/models/cart-item.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    CurrencyPipe
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  userData: User | null = null;
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(authUser => {
      if (!authUser) return;

      const ref = doc(this.firestore, 'Users', authUser.uid);
      getDoc(ref).then(snapshot => {
        if (snapshot.exists()) {
          this.userData = snapshot.data() as User;
        }
      });
    });

    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  orderProduct(product: Product): void {
    if (product.amount > 0) {
      this.cartService.addToCart({ product, quantity: 1 });
      product.amount--;
    } else {
      alert('Ez a termék elfogyott!');
    }
  }

  getQuantity(): number {
    return this.cartService.getTotalQuantity();
  }

  updateAmount(product: Product): void {
    const add = product.addAmount ?? 0;

    if (add <= 0) {
      alert('Adj meg pozitív számot!');
      return;
    }

    const updated = product.amount + add;

    this.productService.updateProductAmount(product.id, updated)
      .then(() => {
        product.amount = updated;
        product.addAmount = 0;
        alert('Készlet frissítve!');
      })
      .catch(() => {
        alert('Hiba történt a frissítés során.');
      });
  }

  updatePrice(product: Product): void {
    if (product.newPrice == null || product.newPrice < 0) {
      alert('Adj meg érvényes árat!');
      return;
    }

    this.productService.updateProduct(product.id, { price: product.newPrice })
      .then(() => {
        product.price = product.newPrice!;
        product.newPrice = undefined;
        alert('Ár frissítve!');
      })
      .catch(() => {
        alert('Hiba az ár frissítésekor.');
      });
  }

  decreaseAmount(product: Product): void {
    const remove = product.removeAmount ?? 0;

    if (remove <= 0 || remove > product.amount) {
      alert('Adj meg érvényes csökkentési mennyiséget!');
      return;
    }

    const updated = product.amount - remove;

    this.productService.updateProductAmount(product.id, updated)
      .then(() => {
        product.amount = updated;
        product.removeAmount = 0;
        alert('Készlet csökkentve!');
      })
      .catch(() => {
        alert('Hiba a készlet csökkentésnél.');
      });
  }

  deleteProduct(product: Product): void {
    if (confirm(`Biztosan törlöd a(z) ${product.name} terméket?`)) {
      this.productService.deleteProduct(product.id)
        .then(() => {
          this.products = this.products.filter(p => p.id !== product.id);
          alert('Termék törölve!');
        })
        .catch(() => {
          alert('Hiba a törlés során.');
        });
    }
  }

  getTotalPrice(): number {
    return this.cartService.getCart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  getCart(): CartItem[] {
    return this.cartItems;
  }
}
