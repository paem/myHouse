import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {slideUpAnimation} from '../../shared/animations/slideUp.animation';
import {fadeInAnimation} from '../../shared/animations/fadeIn.animation';
import {FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideUpAnimation, fadeInAnimation],
})
export class LoginComponent implements OnInit {
  public name: string;
  public loginEmail: string;
  public loginPassword: string;
  public email: string;
  public resetEmail: string;
  public password: string;
  selectedAuthType = 'signin';
  isLoading = false;
  passReset: boolean = false;
  public error: any;
  constructor(private _firebaseService: FirebaseService, private router: Router) {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  resetEmailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit() {
  }


  resetPassword(resetEmail) {
    this._firebaseService.resetPassword(resetEmail)
      .then(() => this.passReset = true);
  }

  loginWithEmail() {
    const account = {
      email: this.loginEmail,
      password: this.loginPassword
    };
    this.isLoading = true;
    this._firebaseService.loginWithPassword(account).then((data) => {
      console.log('SIGNED IN WITH EMAIL', data);
      this.isLoading = false;
      this.router.navigate(['/hem']);
    }).catch((error: any) => {
      if (error) {
        this.isLoading = false;
        this.error = error;
        console.log(this.error);
      }
    });
  }
  logInWithFacebook() {
    this.isLoading = true;
    this._firebaseService.logInWithFacebook().then(authState => {
      console.log('SIGNED IN WITH FACEBOOK');
      this.router.navigate(['/profile']);
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
      this.router.navigate(['/login']);
    });
  }
  onSignUpWithEmail() {
    const account = {
      email: this.email,
      password: this.password,
      name: this.name
    };
    this.isLoading = true;
    this._firebaseService.createUserWithEmailAndPassword(account).then(authState => {
      this.isLoading = false;
      this.router.navigate(['/profile']);
    }).catch((error: any) => {
      if (error) {
        this.isLoading = false;
        this.error = error;
        console.log(this.error);
        this.router.navigate(['/login']);
      }
    });
  }
}
