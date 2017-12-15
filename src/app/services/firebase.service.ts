import { AngularFireAuth } from 'angularfire2/auth';
import { Roles, User } from './../shared/classes/Roles';
import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import { Item } from '../shared/classes/item';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class FirebaseService {
  userData: any;
  firebaseConfig = {
    apiKey: 'AIzaSyA2V_AQd1R2lbCDfjHzAoSXgg7mNPZCzhs',
    authDomain: 'myhouse-58a88.firebaseapp.com',
    databaseURL: 'https://myhouse-58a88.firebaseio.com',
    projectId: 'myhouse-58a88',
    storageBucket: 'myhouse-58a88.appspot.com',
    messagingSenderId: '178332113016'
  };

  user: Observable<User>

  items: Observable<Item[]> = null;
  itemsRef: AngularFireList<Item> = null;
  roles: Roles;
  currentUser: any;

  constructor(private router: Router, private afDb:AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.roles = {user: true}
  if(!firebase.apps.length){
    firebase.initializeApp(this.firebaseConfig);

    // this.afAuth.authState
    // .switchMap(auth => {
    //   if (auth) {
    //     /// signed in
    //     return this.afDb.object('users/' + auth.uid)
    //   } else {
    //     /// not signed in
    //     return Observable.of(null)
    //   }
    // })
    // .subscribe(user => {
    //   this.user = user
    // })
  }
  }

  getInfo(): Observable<Item[]>{
    this.itemsRef = this.afDb.list('Information/');
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    })
    return this.items;
  }

  getCurrentUser() {
   this.userData = firebase.auth().currentUser;
   const afObj = this.afDb.object('users/' + this.userData.uid);
   this.currentUser = afObj.valueChanges();
   this.currentUser.subscribe(a => { return a; });
  return this.currentUser;
  }
  getAdminRole() {
    this.userData = firebase.auth().currentUser;
    const afObj = this.afDb.object('users/' + this.userData.uid +'/role/user');
    this.currentUser = afObj.valueChanges();
    this.currentUser.subscribe(a => { return a; });
   return this.currentUser;
   }
  createInfo(item: Item): void{
    this.itemsRef.push(item);
    }
  updateInfo(key: string, value:any):void{
    this.itemsRef.update(key, value);
  }
  deleteInfo(key: string):void{
    this.itemsRef.remove(key);
  }



  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        subject.next(true)
      } else {
        subject.next(false);
      }
    });
    return subject.asObservable();
  }

  updatePassword(providedPassword, newPassword) {
  return firebase.auth().currentUser.reauthenticateWithCredential(
    firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, providedPassword)).then( () => {
      firebase.auth().currentUser.updatePassword(newPassword);
    });
}

  createUserWithEmailAndPassword(account: {}) {

    return firebase.auth().createUserWithEmailAndPassword(account['email'], account['password']).then(() =>  {

      firebase.auth().signInWithEmailAndPassword(account['email'], account['password']).then(authenticatedUser =>  {

        firebase.database().ref('/').child('/users/' + authenticatedUser.uid).update( {
          email: account['email'],
          name:  account['name'],
          role: this.roles
        });
      });
    });

  }

  loginWithPassword(account: {}) {
    return firebase.auth().signInWithEmailAndPassword(account['email'], account['password']).then(authState => {

      // Creates or Updates /users/uid
      firebase.database().ref('/').child('/users/' + authState.uid).update({
        uid: authState.uid,
        email: account['email'],
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
      firebase.database().ref('/').child('/users/' + user.uid).update({
        accessToken: accessToken,
        uid: user.uid,
        email: user.email,
        name: result.additionalUserInfo.profile.name,
        profilePicture: result.additionalUserInfo.profile.picture.data.url,
        gender: result.additionalUserInfo.profile.gender,
        link: result.additionalUserInfo.profile.link,
        role: user.roles,

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
