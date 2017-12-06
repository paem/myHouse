import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {slideUpAnimation} from '../../shared/animations/slideUp.animation';
import {fadeInAnimation} from '../../shared/animations/fadeIn.animation';
import {FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideUpAnimation, fadeInAnimation],
})
export class LoginComponent implements OnInit {
  selectedAuthType = 'signin';
  isLoading = false;
  public error: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  constructor(private _firebaseService: FirebaseService, private router: Router) {
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  ngOnInit() {
  }
  loginWithEmail(form: NgForm) {
    this.isLoading = true;

    this._firebaseService.loginWithPassword(form.value.email, form.value.password).then((data) => {
      console.log('SIGNED IN WITH EMAIL', data);
      this.isLoading = false;
      this.router.navigate(['/mystable']);
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
      this.router.navigate(['/informationscenter']);
    }).catch(error => {
      this.isLoading = false;
      this.router.navigate(['/hem']);
    });
  }
  onSignUpWithEmail(form: NgForm) {
    this._firebaseService.createUserWithEmailAndPassword(form.value.email, form.value.password).then(authState => {
    }).catch(error => {
    });
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
}
