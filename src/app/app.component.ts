import { AngularFireAuth } from 'angularfire2/auth';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {FirebaseService} from './services/firebase.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public css_class = 'hamburger is-closed';
  public overlay_class = 'overlay';
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
              console.log('Not Logged in.');
              this.router.navigate(['/login']);
              this.isLoggedIn = false;
              this.css_class = 'hidden';
              this.overlay_class = 'hidden';
            } else {
              console.log('Logged in.');
              this.isLoggedIn = true;
              this.css_class = 'hamburger is-closed';
              this.overlay_class = 'overlay';
            }
          });
      }

  onSignOut() {
    this._firebaseService.logout();
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }
}
