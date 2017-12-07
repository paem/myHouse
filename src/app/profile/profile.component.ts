import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { FirebaseService } from '../services/firebase.service';
import * as firebase from 'firebase';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userData: any;
  public newEmail: string;
  public oldPassword: string;
  public newPassword: string;
  isLoading = false;
  passwordAlert = false;
  emailAlert = false;
  error: any;
  constructor(private _firebaseService: FirebaseService, private afDb: AngularFireDatabase) { }
  emailFormControl = new FormControl('', [
    Validators.email,
  ]);
  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser() {
   this.userData = firebase.auth().currentUser;
   const afObj = this.afDb.object('users/' + this.userData.uid);
   this.currentUser = afObj.valueChanges();
   this.currentUser.subscribe(a => { return a; });
  }

  updatePassword() {
    this.isLoading = true;
    this._firebaseService.updatePassword(this.newPassword, this.oldPassword).then((data) => {
      this.passwordAlert = true;
      this.isLoading = false;
      this.oldPassword = null;
      this.newPassword = null;
    }).catch((error: any) => {
      if (error) {
        this.isLoading = false;
        this.error = error;
        console.log(this.error);
        this.oldPassword = null;
        this.newPassword = null;
      }
    });
  }
  updateEmail() {
    this.isLoading = true;
    this.userData.updateEmail(this.newEmail).then((data) => {
      this.emailAlert = true;
      this.isLoading = false;
      this.newEmail = null;
    }).catch((error: any) => {
      if (error) {
        this.isLoading = false;
        this.error = error;
        this.newEmail = null;
      }
    });
  }
}


