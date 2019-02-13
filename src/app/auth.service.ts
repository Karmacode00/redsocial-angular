import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  usersCollection: AngularFirestoreCollection<any>;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
    ) {
    this.user = firebaseAuth.authState;
    this.usersCollection = afs.collection<any>('usersApp');
  }

  register(email: string, password: string) {
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password);

  }

    googleLogin() {
      return new Promise<any>((resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          this.router.navigate(['/wall']);
          this.uploadUserToFirestore();
          resolve (response);
        }, err => {
          console.log(err);
          reject(err);
        });
      });
    }

    facebookLogin() {
      return new Promise<any>((resolve, reject) => {
        const provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(response => {
          this.router.navigate(['/wall']);
          this.uploadUserToFirestore();
          resolve(response);
        }, err => {
          console.log(err);
          reject(err);
        });
      });
    }


  uploadUserToFirestore() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const data: User = {
          uid: user.uid,
          email: user.email || null,
          displayName: user.displayName || 'nameless user',
          photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
      };
      return this.afs.collection(`users`).doc(`${user.uid}`).set(data);
    }
    });
  }

    login(email: string, password: string) {
      return this.afAuth.auth
        .signInWithEmailAndPassword(email, password);
    }
    signOut() {
      console.log('logout');
      this.afAuth.auth.signOut().then(() => {
        this.router.navigate(['/login']);
      });
    }
}
