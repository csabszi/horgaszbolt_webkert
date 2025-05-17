// src/app/admin/import-products.component.ts
import { Component } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-import-products',
  standalone: true,
  template: `
    <div class="import-container">
      <h2>Termékek importálása Firestore-be</h2>
      <button mat-flat-button color="primary" (click)="importProducts()">Importálás indítása</button>
      <p *ngIf="done">✅ Sikeresen importálva!</p>
    </div>
  `,
  styles: [`
    .import-container {
      margin: 2rem;
      text-align: center;
    }
    button {
      margin-top: 1rem;
    }
  `],
  imports: [CommonModule, MatButtonModule]
})
export class ImportProductsComponent {
  done = false;

  constructor(private productService: ProductService) { }

  importProducts() {
    const products: Omit<Product, 'id'>[] = [
      {
        name: 'Pecabot',
        price: 18990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/horgaszbot.jpg',
        amount: 3
      },
      {
        name: 'Horgászcsali szett',
        price: 15900,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/horgaszcsaliszett.jpg',
        amount: 20
      },
      {
        name: 'Horgászbot tartó táska',
        price: 4990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/horgaszbotzsak.jpg',
        amount: 20
      },
      {
        name: 'FISHING BOX ARIEL 3T HORGÁSZ DOBOZ',
        price: 7690,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/fishingboxariel.jpg',
        amount: 7
      },
      {
        name: 'Soluble-Oldódó Flumino Ready-Made Boilies',
        price: 2990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/boilies.jpg',
        amount: 22
      },
      {
        name: 'Etetőanyag 2.5kg',
        price: 2360,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/etetoanyag.jpg',
        amount: 57
      },
      {
        name: 'Rod Pod',
        price: 39000,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/rodpod.jpg',
        amount: 3
      },
      {
        name: 'Elektromos Kapásjelző',
        price: 8990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/elektromoskapasjelzo.jpg',
        amount: 8
      },
      {
        name: 'Horgászsátor',
        price: 24000,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/horgaszsator.jpg',
        amount: 2
      },
      {
        name: 'Pergető szett – bottal',
        price: 19990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/pergetoszetbottal.jpg',
        amount: 4
      },
      {
        name: 'Digitális mérleg',
        price: 3990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/digitalismerleg.jpg',
        amount: 5
      },
      {
        name: 'Halradar',
        price: 29990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/halradar.jpg',
        amount: 5
      },
      {
        name: 'Csalitüske 10db',
        price: 890,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/csalituske.jpg',
        amount: 100
      },
      {
        name: 'Damil 0.25mm',
        price: 1690,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/damil025.jpg',
        amount: 200
      },
      {
        name: 'Haltartó háló',
        price: 2290,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/haltartohalo.jpg',
        amount: 15
      },
      {
        name: 'Merítőháló',
        price: 4790,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/meritohalo.jpg',
        amount: 8
      },
      {
        name: 'Horgászsapka',
        price: 4990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/horgaszsapka.jpg',
        amount: 15
      },
      {
        name: 'Horgász kesztyű',
        price: 5990,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/horgaszkesztyu.jpg',
        amount: 10
      },
      {
        name: 'Mentőmellény',
        price: 11299,
        imageUrl: 'https://raw.githubusercontent.com/csabszi/horgaszbolt_webkert/refs/heads/main/horgaszbolt_webshop/public/mentomelleny.jpg',
        amount: 5
      }
    ];

    const uploads = products.map(p => this.productService.addProduct(p));
    Promise.all(uploads).then(() => {
      this.done = true;
    });
  }
}
