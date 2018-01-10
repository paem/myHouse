import { FirebaseService } from './../../../services/firebase.service';
import { Item } from './../../../shared/classes/item';
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
  determinateProgressValue: number = 33.33;
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

  stepDeterminateProgressVal(val: number) {
    this.determinateProgressValue = this.clampValue(val + this.determinateProgressValue);
  }

  private clampValue(value: number) {
    return Math.max(0, Math.min(100, value));
  }
}
