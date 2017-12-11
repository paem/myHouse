import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Params } from '@angular/router';
import { Item } from './../../shared/classes/item';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-update-info',
  templateUrl: './update-info.component.html',
  styleUrls: ['./update-info.component.css']
})
export class UpdateInfoComponent implements OnInit, OnDestroy {

  createdAt:any = firebase.database.ServerValue.TIMESTAMP;  
  key:any;
  paramsSubscription: Subscription;
  
  constructor(private fbService: FirebaseService, private route: ActivatedRoute, private afDb: AngularFireDatabase) { }
  
  info: any;
  // @Input() item: Item;
  item: Item = new Item();
  
  title:any;
  body:any;
  subTitle:any;
  subBody:any;
  type:any;
  tab:any;
  itemsRef:AngularFireList<Item>;
  
  
      types = [
        'Hus',
        'Bostadsrätt',
      ];
      tabs = [
        'Innan Köp',
        'Under Köp',
        'Efter Köp',      
      ];

  ngOnInit() {
    this.key = this.route.snapshot.params['key'];
    this.paramsSubscription = this.route.params
      .subscribe((params:Params) =>{
      this.key = params['key'];
    });
    this.getInfoByKey();   
  }

  getInfoByKey() {
    const afObj = this.afDb.object('Information/' + this.key);
    this.info = afObj.valueChanges();
    this.info.subscribe(a => { return a; });
    // this.info = this.fbService.getInfoByKey(this.key); 
   }

  ngOnDestroy(){
    this.paramsSubscription.unsubscribe();
  }

  updateInfo(){
    this.item.tab = this.tab;
    this.item.type = this.type;  
    this.item.subBody = this.subBody;
    this.item.subTitle = this.subTitle;  
    this.item.title = this.title;    
    this.item.body = this.body;  
    
    console.log(this.item)
    
     this.fbService.updateInfo(this.key, this.item);
  }

}
