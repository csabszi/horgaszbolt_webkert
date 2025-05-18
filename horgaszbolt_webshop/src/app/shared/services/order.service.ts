import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, serverTimestamp } from '@angular/fire/firestore';
import { OrderData } from '../models/order-data.model';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private firestore: Firestore) { }

  async createOrder(order: Omit<OrderData, 'id' | 'createdAt'>) {
    const orderRef = collection(this.firestore, 'Orders');
    return await addDoc(orderRef, {
      ...order,
      createdAt: serverTimestamp()
    });
  }
}