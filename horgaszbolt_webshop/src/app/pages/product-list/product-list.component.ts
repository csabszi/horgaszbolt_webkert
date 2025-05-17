import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartItem } from '../../shared/models/cart-item.model';
import { OrderData } from '../../shared/models/order-data.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../../shared/models/currency.pipe';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [RouterModule, CommonModule, CurrencyPipe, MatIconModule],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  orderProduct(product: Product): void {
    if (product.amount > 0) {
      product.amount--;
      this.cartService.addToCart({ product, quantity: 1 });
      // itt nem mentjük vissza, ha kell, lehet frissíteni is Firebase-ben
    } else {
      alert('Ez a termék elfogyott!');
    }
  }

  getQuantity(): number {
    return this.cartService.getTotalQuantity();
  }
}
