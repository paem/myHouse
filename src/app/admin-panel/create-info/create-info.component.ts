import { FirebaseService } from './../../services/firebase.service';
import { Item } from './../../shared/classes/item';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-create-info',
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.css']
})
export class CreateInfoComponent implements OnInit {

  item: Item = new Item();

type:any;
tab:any;

    types = [
      'Hus',
      'Bostadsrätt',
    ];
    tabs = [
      'Innan Köp',
      'Under Köp',
      'Efter Köp',      
    ];
  
    constructor(private fbService: FirebaseService) { }
  
    ngOnInit() {
    }
    createInfo(){
      this.item.tab = this.tab;
      this.item.type = this.type; 
      console.log(this.item);
  
      this.fbService.createInfo(this.item);
      this.item = new Item();
      this.tab = null;
      this.type = null;
    }

  }
