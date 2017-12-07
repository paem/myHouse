import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public oldPassword: string;
  public newPassword: string;
  public email: string;
  public adress: string;
  constructor() { }
  emailFormControl = new FormControl('', [
    Validators.email,
  ]);
  ngOnInit() {
  }

}
