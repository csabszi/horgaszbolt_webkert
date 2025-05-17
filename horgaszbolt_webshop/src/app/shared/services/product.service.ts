import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData, doc, DocumentReference, DocumentData } from '@angular/fire/firestore';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { addDoc, updateDoc, deleteDoc, doc as firestoreDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsCollection;

  constructor(private firestore: Firestore) {
    this.productsCollection = collection(this.firestore, 'Products');
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsCollection, { idField: 'id' }) as Observable<Product[]>;
  }

  addProduct(product: Omit<Product, 'id'>): Promise<DocumentReference<DocumentData>> {
    return addDoc(this.productsCollection, product);
  }

  updateProduct(id: string, product: Partial<Product>) {
    const productRef = doc(this.firestore, 'Products', id);
    return updateDoc(productRef, product);
  }

  deleteProduct(id: string) {
    const productRef = doc(this.firestore, 'Products', id);
    return deleteDoc(productRef);
  }
}