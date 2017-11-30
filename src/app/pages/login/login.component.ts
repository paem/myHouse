import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FirebaseService} from '../../services/firebase.service';
import {slideUpAnimation} from '../../shared/animations/slideUp.animation';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideUpAnimation],
})
export class LoginComponent implements OnInit {

  isLoading = false;
  public error: any;
  constructor(private _firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
  }

  logInWithFacebook() {
    this.isLoading = true;
    this._firebaseService.logInWithFacebook().then(authState => {
      console.log('SIGNED IN WITH FACEBOOK');

    }).catch(error => {
      this.isLoading = false;
      this.router.navigate(['/hem']);
    });
  }
}
