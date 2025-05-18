import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import {
  collection,
  query,
  where,
  orderBy,
  getDoc,
  doc,
  Firestore,
  getDocs
} from '@angular/fire/firestore';
import { User } from '../../shared/models/User';
import { Message } from '../../shared/models/message.model';
import { FormsModule } from '@angular/forms';
import { HungarianDatePipe } from '../../shared/pipes/hungarian-date.pipe';
import { OrderData } from '../../shared/models/order-data.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, HungarianDatePipe],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: User | null = null;
  allMessages: Message[] = [];
  filteredMessages: Message[] = [];
  selectedCategory: string = '';
  orders: OrderData[] = [];
  sortBy: 'date' | 'price' = 'date';

  private authUserId: string = '';

  constructor(
    private authService: AuthService,
    private firestore: Firestore
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(authUser => {
      if (!authUser) return;

      this.authUserId = authUser.uid;

      const ref = doc(this.firestore, 'Users', authUser.uid);
      getDoc(ref).then(snapshot => {
        if (snapshot.exists()) {
          this.userData = snapshot.data() as User;

          if (this.userData.isAdmin) {
            this.loadMessages();
          }

          this.loadUserOrders();
        }
      });
    });
  }

  async loadMessages() {
    const messagesRef = collection(this.firestore, 'Messages');

    let q;

    if (this.selectedCategory) {
      q = query(
        messagesRef,
        where('category', '==', this.selectedCategory),
        orderBy('sentDate', 'desc')
      );
    } else {
      q = query(messagesRef, orderBy('sentDate', 'desc'));
    }

    const snap = await getDocs(q);

    this.filteredMessages = snap.docs.map(doc => {
      const data = doc.data() as Message;

      return {
        ...data,
        sentDateConverted: data.sentDate?.toDate?.()
      };
    });
  }

  filterMessages() {
    this.loadMessages();
  }

  async loadUserOrders() {
    const ordersRef = collection(this.firestore, 'Orders');

    let orderQuery;

    if (this.sortBy === 'price') {
      orderQuery = query(
        ordersRef,
        where('userId', '==', this.authUserId),
        orderBy('totalPrice', 'desc')
      );
    } else {
      orderQuery = query(
        ordersRef,
        where('userId', '==', this.authUserId),
        orderBy('createdAt', 'desc')
      );
    }

    const snap = await getDocs(orderQuery);

    this.orders = snap.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        createdAt: data['createdAt']?.toDate?.()
      } as OrderData;
    });
  }

  changeSort(by: 'date' | 'price') {
    this.sortBy = by;
    this.loadUserOrders();
  }
}