import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from './firebase-service.service';
import { UserData } from '../models/UserData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticatedSubject = new BehaviorSubject<any>(undefined);
  isUserAuthenticatedObservable = this.isUserAuthenticatedSubject.asObservable();

  constructor(private firebaseAuth: AngularFireAuth, private firebaseService: FirebaseService, private router: Router) { }

  signInRegular(email: string, password: string) {
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpRegular(signUpForm: any) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
  }

  setUser(uid: string) {
    if (uid) {
      this.firebaseService.getUserById(uid).subscribe(user => {
        this.isUserAuthenticatedSubject.next(new UserData(user));
      });
    } else {
      this.isUserAuthenticatedSubject.next(null);
    }
  }

  verifyIfUserAlreadySignedIn() {
    return this.firebaseAuth.authState.subscribe(item => {
      if (item !== null) {
        this.setUser(item.uid);
      }
    });
  }

  logOut() {
    this.setUser(null);
    return this.firebaseAuth.auth.signOut().then(res => {
      this.router.navigateByUrl(`/`);
    });
  }

}
