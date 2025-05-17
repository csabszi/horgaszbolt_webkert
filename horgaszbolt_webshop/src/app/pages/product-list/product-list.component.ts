import { Component } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { CartItem } from '../../shared/models/cart-item.model';
import { OrderData } from '../../shared/models/order-data.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../../shared/models/currency.pipe';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [RouterModule,
    CommonModule,
    CurrencyPipe,
    MatIconModule],
})
export class ProductListComponent {
  constructor(private cartService: CartService) { }

  products: Product[] = [
    {
      id: 1,
      name: 'CarpMaster 3000 orsó',
      price: 14990,
      imageUrl: 'Carpmaster3000.jpg',
      amount: 5
    },
    {
      id: 2,
      name: 'Pecabot',
      price: 18990,
      imageUrl: 'horgaszbot.jpg',
      amount: 3
    },
    {
      id: 3,
      name: 'Horgászcsali szett',
      price: 15900,
      imageUrl: 'horgaszcsaliszett.jpg',
      amount: 20
    },
    {
      id: 4,
      name: 'Horgászbot tartó táska',
      price: 4990,
      imageUrl: 'horgaszbotzsak.jpg',
      amount: 20
    },
    {
      id: 5,
      name: 'FISHING BOX ARIEL 3T HORGÁSZ DOBOZ',
      price: 7690,
      imageUrl: 'fishingboxariel.jpg',
      amount: 7
    },
    {
      id: 6,
      name: 'Soluble-Oldódó Flumino Ready-Made Boilies',
      price: 2990,
      imageUrl: 'boilies.jpg',
      amount: 22
    },
    {
      id: 7,
      name: 'Etetőanyag 2.5kg',
      price: 2360,
      imageUrl: 'etetoanyag.jpg',
      amount: 57
    },
    {
      id: 8,
      name: 'Rod Pod',
      price: 39000,
      imageUrl: 'rodpod.jpg',
      amount: 3
    },
    {
      id: 9,
      name: 'Elektromos Kapásjelző',
      price: 8990,
      imageUrl: 'elektromoskapasjelzo.jpg',
      amount: 8
    },
    {
      id: 10,
      name: 'Horgászsátor',
      price: 24000,
      imageUrl: 'horgaszsator.jpg',
      amount: 2
    },
    {
      id: 11,
      name: 'Pergető szett – bottal',
      price: 19990,
      imageUrl: 'pergetoszetbottal.jpg',
      amount: 4
    },
    {
      id: 12,
      name: 'Digitális mérleg',
      price: 3990,
      imageUrl: 'digitalismerleg.jpg',
      amount: 5
    },
    {
      id: 13,
      name: 'Halradar',
      price: 29990,
      imageUrl: 'halradar.jpg',
      amount: 5
    },
    {
      id: 14,
      name: 'Csalitüske 10db',
      price: 890,
      imageUrl: 'csalituske.jpg',
      amount: 100
    },
    {
      id: 15,
      name: 'Damil 0.25mm',
      price: 1690,
      imageUrl: 'damil025.jpg',
      amount: 200
    },
    {
      id: 16,
      name: 'Haltartó háló',
      price: 2290,
      imageUrl: 'haltartohalo.jpg',
      amount: 15
    },
    {
      id: 17,
      name: 'Merítőháló',
      price: 4790,
      imageUrl: 'meritohalo.jpg',
      amount: 8
    },
    {
      id: 18,
      name: 'Horgászsapka',
      price: 4990,
      imageUrl: 'horgaszsapka.jpg',
      amount: 15
    },
    {
      id: 19,
      name: 'Horgász kesztyű',
      price: 5990,
      imageUrl: 'horgaszkesztyu.jpg',
      amount: 10
    },
    {
      id: 20,
      name: 'Mentőmellény',
      price: 11299,
      imageUrl: 'mentomelleny.jpg',
      amount: 5
    }
  ];

  ngOnInit(): void {
    const saved = localStorage.getItem('products');
    this.products = saved ? JSON.parse(saved) : [...this.products];
  }

  cart: CartItem[] = [];
  formAdatok: OrderData | null = null;

  orderProduct(product: Product): void {
    if (product.amount > 0) {
      product.amount--;
      this.cartService.addToCart({ product, quantity: 1 });
      localStorage.setItem('products', JSON.stringify(this.products));
    } else {
      alert('Ez a termék elfogyott!');
    }
  }

  getQuantity(): number {
    return this.cartService.getTotalQuantity();
  }
}