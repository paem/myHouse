import { FileItem } from './../../shared/classes/file-item';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Item } from './../../shared/classes/item';
import { FirebaseService } from './../../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router/src/router_state';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {
  public items:Observable<Item[]>;  
  item: Item = new Item();
  
  constructor(private fbService: FirebaseService, private router: Router, private afDb: AngularFireDatabase) { }

  ngOnInit() {
    this.items = this.fbService.getInfo();
  }


  deleteInfo(key:any){
    this.fbService.deleteInfo(key);
    
  }

}
