import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Item } from './../../shared/classes/item';
import { FirebaseService } from './../../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute } from '@angular/router/src/router_state';

@Component({
  selector: 'app-show-info',
  templateUrl: './show-info.component.html',
  styleUrls: ['./show-info.component.css']
})
export class ShowInfoComponent implements OnInit {
  public items:Observable<Item[]>;  
  item: Item = new Item();
  
  constructor(private fbService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.items = this.fbService.getInfo();
  }

  
  updateInfo(key:any){
    // this.router.navigate(['/edit'])
    //this.route.data = key;

  }
  
  deleteInfo(key:any){
    this.fbService.deleteInfo(key);
  }

}
