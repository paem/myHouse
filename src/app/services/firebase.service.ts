import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import { Item } from '../shared/classes/item'; 
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

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

  items: Observable<Item[]> = null;
  itemsRef: AngularFireList<Item> = null;  
  // keyInfo:any;

  constructor(private router: Router, private afDb:AngularFireDatabase) {
  if(!firebase.apps.length){
    firebase.initializeApp(this.firebaseConfig);      
  }
  }

  getInfo(): Observable<Item[]>{
    this.itemsRef = this.afDb.list('Information/');    
    this.items = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({key: c.payload.key, ...c.payload.val()}));
    })
    return this.items;
  }
  // getInfoByKey(key: string){
  //   const afObj = this.afDb.object('Information/'+key);    
  //   this.keyInfo = afObj.valueChanges();
  //   this.keyInfo.subscribe(a => { return a; });  
  // }
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
        subject.next(true);
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
          name:  account['name']
        });
      });
    });

  }

  loginWithPassword(account: {}) {
    return firebase.auth().signInWithEmailAndPassword(account['email'], account['password']).then(authState => {

      // Creates or Updates /users/uid
      firebase.database().ref('/').child('/users/' + authState.uid).update({
        uid: authState.uid,
        email: account['email']
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
        link: result.additionalUserInfo.profile.link

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
