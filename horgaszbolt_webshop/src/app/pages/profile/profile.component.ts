import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { collection, query, where, orderBy, getDoc, doc, Firestore, getDocs } from '@angular/fire/firestore';
import { User } from '../../shared/models/User';
import { Message } from '../../shared/models/message.model';
import { FormsModule } from '@angular/forms';
import { HungarianDatePipe } from '../../shared/pipes/hungarian-date.pipe';


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

  constructor(
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

          if (this.userData.isAdmin) {
            this.loadMessages();
          }
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
      q = query(
        messagesRef,
        orderBy('sentDate', 'desc')
      );
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
}