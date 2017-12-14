import { ContactInfo } from './../shared/classes/contact-info';
import { FileItem } from './../shared/classes/file-item';
import { Component, OnInit } from '@angular/core';
import {GeoService} from '../services/geo.service';
import {FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {
  public brokerInputLat: number;
  public brokerInputLng: number;
  public brokerName: string = '';
  public brokerDescription: string = '';
  public brokerPhone: string = '';
  public brokerAddress: string = '';
  public brokerEmail: string;
  public brokerImage: FileItem;
  brokerCoordArray = [];
  brokerAlert = false;
  
  contractorCoordArray = [];
  contractorAlert = false;
  brokerFillInValuesAlert: any;
  contractorFillInValuesAlert: any;
  error: any;
  isLoading: any;
  proceed: any;
  
  selectedFiles: FileList;
  currentUpload: FileItem;

  contactInfo = new ContactInfo();

  constructor(private geo: GeoService) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit() {

  }


  getCoordsBroker() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.brokerInputLat = position.coords.latitude;
        this.brokerInputLng = position.coords.longitude;
        console.log(this.brokerInputLat, this.brokerInputLng);
      });
    }
  }


  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  upload(fileItem:FileItem){
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);    
    let uploadTask = storageRef.child(`Images/${filename}`).put(fileItem.file);
  
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
         fileItem.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        fileItem.url = uploadTask.snapshot.downloadURL
        fileItem.name = filename.toString();
        this.saveFileData(fileItem)
      }
    );
  }
  
  createBroker(){
    let file = this.selectedFiles.item(0)
    this.currentUpload = new FileItem(file);
    this.upload(this.currentUpload)
  }


  saveFileData(item: FileItem) {
   /* if (typeof this.brokerName || this.brokerDescription || this.brokerEmail || this.brokerAddress || this.brokerPhone === 'undefined' || null) {
      this.brokerFillInValuesAlert = true;
    }
    */
    
    this.isLoading = true;
    this.brokerImage = item;
    this.contactInfo.Adress = this.brokerAddress;
    this.contactInfo.Email = this.brokerEmail;
    this.contactInfo.Phone = this.brokerPhone;

      this.brokerCoordArray.push(this.brokerInputLat, this.brokerInputLng);
      this.geo.createBroker(this.brokerCoordArray, this.brokerName, this.brokerDescription, this.contactInfo, this.brokerImage).then( () => {
        this.brokerAlert = true;
        this.isLoading = false;
        this.brokerCoordArray = null;
        this.contactInfo = null;
        this.brokerName = '';
        this.brokerDescription = '';
        this.brokerEmail = '';
        this.brokerAddress = '';
        this.brokerPhone = '';
        this.brokerInputLat = null;
        this.brokerInputLng = null;
        this.brokerImage = null;
      }).catch(err => {
        this.error = err;
        this.isLoading = false;
        this.brokerCoordArray = null;
        this.contactInfo = null;
        this.brokerName = '';
        this.brokerDescription = '';
        this.brokerEmail = '';
        this.brokerAddress = '';
        this.brokerPhone = '';
        this.brokerInputLat = null;
        this.brokerInputLng = null;
        this.brokerImage = null;
      });
    
  }
}
