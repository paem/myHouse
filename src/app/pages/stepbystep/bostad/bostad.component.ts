import { FirebaseService } from './../../../services/firebase.service';
import { Item } from './../../../shared/classes/item';
import {  } from './../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bostad',
  templateUrl: './bostad.component.html',
  styleUrls: ['./bostad.component.css']
})
export class BostadComponent implements OnInit {

  public items:Observable<Item[]>;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder, private fbService: FirebaseService) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.items = this.fbService.getInfo();
  }

}