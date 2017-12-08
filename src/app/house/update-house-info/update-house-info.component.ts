import { Item } from './../../shared/classes/item';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-update-house-info',
  templateUrl: './update-house-info.component.html',
  styleUrls: ['./update-house-info.component.css']
})
export class UpdateHouseInfoComponent implements OnInit {
 
  @Input() item: Item;

  createdAt:any = firebase.database.ServerValue.TIMESTAMP;  
  key:any;

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }

  updateTimeStamp() {
    let date = new Date().getTime()
    this.fbService.updateInfo(this.key, { timeStamp: date })
  }
  updateActive(value: boolean) {
    this.fbService.updateInfo(this.key, { active: value })
  }
  deleteItem() {
    this.fbService.deleteInfo(this.key)
  }



}
