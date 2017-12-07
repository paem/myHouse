import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {slideUpAnimation} from '../../shared/animations/slideUp.animation';
import {fadeInAnimation} from '../../shared/animations/fadeIn.animation';
import {FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideUpAnimation, fadeInAnimation],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  selectedAuthType = 'signin';
  isLoading = false;
  public error: any;
  constructor(private _firebaseService: FirebaseService, private router: Router) {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit() {
  }
  loginWithEmail(form: NgForm) {
    this.isLoading = true;

    this._firebaseService.loginWithPassword(form.value.email, form.value.password).then((data) => {
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
      this.router.navigate(['/login']);
    });
  }
  onSignUpWithEmail() {
    const account = {
      email: this.email,
      password: this.password
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
