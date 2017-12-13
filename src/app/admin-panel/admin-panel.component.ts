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
  public brokerEmail: string = '';
  public brokerImage: string = '';
  brokerCoordArray = [];
  brokerContactInformationArray = [];
  brokerAlert = false;
  public contractorInputLat: number;
  public contractorInputLng: number;
  public contractorName: string;
  public contractorDescription: string;
  public contractorPhone: string;
  public contractorAddress: string;
  public contractorEmail: string;
  public contractorImage: string;
  contractorCoordArray = [];
  contractorContactInformationArray = [];
  contractorAlert = false;
  brokerFillInValuesAlert: any;
  contractorFillInValuesAlert: any;
  error: any;
  isLoading: any;
  proceed: any;

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
  getCoordsContractor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.contractorInputLat = position.coords.latitude;
        this.contractorInputLng = position.coords.longitude;
      });
    }
  }
  createBroker() {
   /* if (typeof this.brokerName || this.brokerDescription || this.brokerEmail || this.brokerAddress || this.brokerPhone === 'undefined' || null) {
      this.brokerFillInValuesAlert = true;
    }
    */

   // ska funka men nepp...
    this.isLoading = true;
    const filename = this.brokerImage;
    const storageRef = firebase.storage().ref().child(`images/` + filename);
    const uploadTask = storageRef.put(this.brokerImage);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) =>  (error) => {}, () => {
      const downloadURL = uploadTask.snapshot.downloadURL;
      console.log(downloadURL);
      this.brokerCoordArray.push(this.brokerInputLat, this.brokerInputLng);
      this.brokerContactInformationArray.push(this.brokerPhone, this.brokerAddress, this.brokerEmail);
      this.geo.createBroker(this.brokerCoordArray, this.brokerName, this.brokerDescription, this.brokerContactInformationArray, downloadURL).then( () => {
        this.brokerAlert = true;
        this.isLoading = false;
        this.brokerCoordArray = null;
        this.brokerContactInformationArray = null;
        this.brokerName = '';
        this.brokerDescription = '';
        this.brokerEmail = '';
        this.brokerAddress = '';
        this.brokerPhone = '';
        this.brokerInputLat = null;
        this.brokerInputLng = null;
      }).catch(err => {
        this.error = err;
        this.isLoading = false;
        this.brokerCoordArray = null;
        this.brokerContactInformationArray = null;
        this.brokerName = '';
        this.brokerDescription = '';
        this.brokerEmail = '';
        this.brokerAddress = '';
        this.brokerPhone = '';
        this.brokerInputLat = null;
        this.brokerInputLng = null;
      });
    });
  }
  createContractor() {
   /* if (this.contractorName || this.contractorDescription || this.contractorEmail || this.contractorAddress || this.contractorPhone == null) {
      this.contractorFillInValuesAlert = true;
    }
    */
      this.isLoading = true;
    const storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const imageRef = storageRef.child(`images/${filename}.jpg`);

    imageRef.putString(this.contractorImage, firebase.storage.StringFormat.DATA_URL).then((savedPicture) => {
      this.contractorCoordArray.push(this.contractorInputLat, this.contractorInputLng);
      this.contractorContactInformationArray.push(this.contractorPhone, this.contractorAddress, this.contractorEmail);
      this.geo.createContractor(this.contractorCoordArray, this.contractorName, this.contractorDescription, this.contractorContactInformationArray, savedPicture.downloadURL).then( () => {
        this.contractorAlert = true;
        this.isLoading = false;
        this.contractorCoordArray = null;
        this.contractorContactInformationArray = null;
        this.contractorName = '';
        this.contractorDescription = '';
        this.contractorEmail = '';
        this.contractorAddress = '';
        this.contractorPhone = '';
        this.contractorInputLat = null;
        this.contractorInputLng = null;
      }).catch(err => {
        this.error = err;
        this.isLoading = false;
        this.contractorCoordArray = null;
        this.contractorContactInformationArray = null;
        this.contractorName = '';
        this.contractorDescription = '';
        this.contractorEmail = '';
        this.contractorAddress = '';
        this.contractorPhone = '';
        this.contractorInputLat = null;
        this.contractorInputLng = null;
      });
    });
  }
}
