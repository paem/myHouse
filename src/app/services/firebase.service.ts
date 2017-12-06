import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class FirebaseService {
  private _dbRoot: firebase.database.Reference;


  firebaseConfig = {
    apiKey: 'AIzaSyA2V_AQd1R2lbCDfjHzAoSXgg7mNPZCzhs',
    authDomain: 'myhouse-58a88.firebaseapp.com',
    databaseURL: 'https://myhouse-58a88.firebaseio.com',
    projectId: 'myhouse-58a88',
    storageBucket: 'myhouse-58a88.appspot.com',
    messagingSenderId: '178332113016'
  };
  constructor(private router: Router) {

  }

  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
  }


  createUserWithEmailAndPassword(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }


  loginWithPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(authState => {

      // Creates or Updates /users/uid
      firebase.database().ref('/').child('/users/' + authState.uid).update({
        uid: authState.uid,
        email: authState.email
      });
    });
  }
  logInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();

    return firebase.auth().signInWithPopup(provider).then(result => {

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const accessToken = result.credential.accessToken;

      // The signed-in user info.
      const user = result.user;

      // Creates or Updates /users/uid
      this._dbRoot.child('/users/' + user.uid).update({
        accessToken: accessToken,
        uid: user.uid,
        email: user.email,
      });
    });
  }

  /**
   * Logs out the current user
   */
  logout() {
    firebase.auth().signOut();
    this.router.navigate(['/login']);
  }
}
