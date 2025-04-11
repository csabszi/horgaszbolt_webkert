import { Component } from '@angular/core';
import { Product } from '../../shared/product.model';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '../../shared/currency.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  imports: [RouterModule, CommonModule, CurrencyPipe],
})
export class ProductListComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'CarpMaster 3000 orsó',
      price: 14990,
      imageUrl: 'Carpmaster3000.jpg',
      description: 'Prémium orsó pontyhorgászathoz.',
      amount: 1
    },
    {
      id: 2,
      name: 'Pecabot',
      price: 18990,
      imageUrl: 'horgaszbot.jpg',
      description: 'Erős és rugalmas horgászbot minden vízhez.',
      amount: 0
    },
    {
      id: 3,
      name: 'Horgászcsali szett',
      price: 15900,
      imageUrl: 'horgaszcsaliszett.jpg',
      description: 'Horgászcsali szett horgászathoz.',
      amount: 1
    },
    {
      id: 4,
      name: 'Horgászbot tartó táska',
      price: 4990,
      imageUrl: 'horgaszbotzsak.jpg',
      description: 'Horgászbot tartó táska.',
      amount: 1
    },
    {
      id: 5,
      name: 'FISHING BOX ARIEL 3T HORGÁSZ DOBOZ',
      price: 7690,
      imageUrl: 'fishingboxariel.jpg',
      description: 'Hatékony etetőkosár feeder technikához.',
      amount: 1
    },
    {
      id: 6,
      name: 'Soluble-Oldódó Flumino Ready-Made Boilies',
      price: 2990,
      imageUrl: 'boilies.jpg',
      description: 'A Flumino bojli oldódó változata. Ezzel a változattal még gyorsabban az etetésünkre fognak találni a pontyok! ',
      amount: 1
    },
    {
      id: 7,
      name: 'Etetőanyag 2.5kg',
      price: 2360,
      imageUrl: 'etetoanyag.jpg',
      description: 'Erős illatú keverék halak beetetéséhez.',
      amount: 1
    },
    {
      id: 8,
      name: 'Rod Pod',
      price: 39000,
      imageUrl: 'rodpod.jpg',
      description: 'Stabil rod pod állítható lábakkal.',
      amount: 1
    },
    {
      id: 9,
      name: 'Elektromos Kapásjelző',
      price: 8990,
      imageUrl: 'elektromoskapasjelzo.jpg',
      description: 'Kapásérzékelő hang- és fényjelzéssel.',
      amount: 1
    },
    {
      id: 10,
      name: 'Horgászsátor',
      price: 24000,
      imageUrl: 'horgaszsator.jpg',
      description: 'Vízálló sátor éjszakai horgászathoz.',
      amount: 1
    },
    {
      id: 11,
      name: 'Pergető szett – bottal',
      price: 19990,
      imageUrl: 'pergetoszetbottal.jpg',
      description: 'Komplett szett kezdő pergetőknek.',
      amount: 1
    },
    {
      id: 12,
      name: 'Digitális mérleg',
      price: 3990,
      imageUrl: 'digitalismerleg.jpg',
      description: 'Pontos halmérleg akár 50kg-ig.',
      amount: 1
    },
    {
      id: 13,
      name: 'Halradar',
      price: 29990,
      imageUrl: 'halradar.jpg',
      description: 'Halradar víz alatti világ felfedezéséhez.',
      amount: 1
    },
    {
      id: 14,
      name: 'Csalitüske 10db',
      price: 890,
      imageUrl: 'csalituske.jpg',
      description: 'Gyors csalizás csalitüskével.',
      amount: 1
    },
    {
      id: 15,
      name: 'Damil 0.25mm',
      price: 1690,
      imageUrl: 'damil025.jpg',
      description: 'Erős damil (0.25mm)',
      amount: 1
    },
    {
      id: 16,
      name: 'Haltartó háló',
      price: 2290,
      imageUrl: 'haltartohalo.jpg',
      description: 'Praktikus haltartó háló a kifogott halaknak!',
      amount: 1
    },
    {
      id: 17,
      name: 'Merítőháló',
      price: 4790,
      imageUrl: 'meritohalo.jpg',
      description: 'Merítőháló',
      amount: 1
    },
    {
      id: 18,
      name: 'Horgászsapka',
      price: 4990,
      imageUrl: 'horgaszsapka.jpg',
      description: 'UV védelem és kényelem horgászathoz.',
      amount: 1
    },
    {
      id: 19,
      name: 'Horgász kesztyű',
      price: 5990,
      imageUrl: 'horgaszkesztyu.jpg',
      description: 'Vízlepergető, csúszásmentes horgászkesztyű.',
      amount: 1
    },
    {
      id: 20,
      name: 'Mentőmellény',
      price: 11299,
      imageUrl: 'mentomelleny.jpg',
      description: 'Kötelező felszerelés csónakos pecához.',
      amount: 1
    }
  ];

}
