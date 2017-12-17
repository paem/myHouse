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
  updateUserEmail = firebase.auth().currentUser;
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
    this.currentUser = this._firebaseService.getCurrentUser();
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
  updateEmail(newEmail) {
    this.isLoading = true;
    this.updateUserEmail.updateEmail(newEmail).then((data) => {
      this.updateUserEmail.sendEmailVerification();
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


