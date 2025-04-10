import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'product-list', component: ProductListComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: NotFoundComponent },
];
