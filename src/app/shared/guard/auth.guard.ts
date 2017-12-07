import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import { FirebaseService } from '../../services/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(protected authService: FirebaseService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authService.isAuthenticated().first();
  }
}
