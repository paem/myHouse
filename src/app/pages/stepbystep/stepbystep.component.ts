import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepbystep',
  templateUrl: './stepbystep.component.html',
  styleUrls: ['./stepbystep.component.css']
})
export class StepbystepComponent implements OnInit {
  isLinear = false;
  switch:any;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.switch = true;
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  
  }
  checked(){
    this.switch
    
  }

}
