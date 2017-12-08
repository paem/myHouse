import { FirebaseService } from './../../services/firebase.service';
import { Item } from './../../shared/classes/item';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-house-info',
  templateUrl: './create-house-info.component.html',
  styleUrls: ['./create-house-info.component.css']
})
export class CreateHouseInfoComponent implements OnInit {

  item: Item = new Item();

  constructor(private fbService: FirebaseService) { }

  ngOnInit() {
  }
  createInfo(){
    
    this.fbService.createInfo(this.item)
    this.item = new Item()
  }

}
