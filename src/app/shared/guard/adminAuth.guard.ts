import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Item } from '../../shared/classes/item';
import * as _ from 'lodash';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';


@Injectable()
export class AdminAuthGuard implements Resolve<boolean> {
  currentUser:any;
    constructor(private auth:FirebaseService , private router: Router, private afAuth: AngularFireAuth, private afDb:AngularFireDatabase) {}
    resolve(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | boolean {
      
        this.currentUser = this.auth.getAdminRole();
        return this.currentUser
                   .first()
                   .map(user => !!user)
                   .do(authorized => {
                     if (!authorized) {
                      //  console.log('route prevented!')
                      this.router.navigate(['/']);
                     }
                   })
    }
  
  }