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
  isAuthenticated = false;
  private subscription: Subscription;
  constructor(private _firebaseService: FirebaseService, private router: Router) {
    this.subscription = this._firebaseService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }
  onSignOut() {
    this._firebaseService.logout();
    this.router.navigate(['/login']);
  }
}
