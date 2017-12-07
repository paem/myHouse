import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../services/firebase.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  isAuthenticated = false;
  private subscription: Subscription;
  constructor(private _firebaseService: FirebaseService, private router: Router) {
    this.subscription = this._firebaseService.isAuthenticated().subscribe(
      authStatus => this.isAuthenticated = authStatus
    );
  }
  ngOnInit() {

  }

  onSignOut() {
    this._firebaseService.logout();
    this.router.navigate(['/login']);
  }
}
