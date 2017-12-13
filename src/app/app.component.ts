import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {FirebaseService} from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  isLoggedIn = false;
  isAuthenticated = false;
  private subscription: Subscription;
  constructor(private _firebaseService: FirebaseService, private af: AngularFireAuth, private router: Router) {
    this.subscription = this._firebaseService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }
  ngOnInit() {

        this.af.authState.subscribe(
          (auth) => {
            if (auth == null) {
              console.log("Not Logged in.");
              this.router.navigate(['/login']);
              this.isLoggedIn = false;
            }
            else {
              console.log("Successfully Logged in.");

              this.isLoggedIn = true;

            }
          });
      }

  onSignOut() {
    this._firebaseService.logout();
    this.router.navigate(['/login']);
  }
}
