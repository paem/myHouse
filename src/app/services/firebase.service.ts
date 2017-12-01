import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class FirebaseService {
  private _dbRoot: firebase.database.Reference;
  constructor(private router: Router) { }

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
