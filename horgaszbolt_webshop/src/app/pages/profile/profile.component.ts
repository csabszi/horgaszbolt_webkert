import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../shared/services/auth.service';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: User | null = null;

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
        }
      });
    });
  }
}