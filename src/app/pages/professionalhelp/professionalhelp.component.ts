import {Component, OnDestroy, OnInit} from '@angular/core';
import { GeoService } from '../../services/geo.service';
import * as firebase from 'firebase';
import {FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-professionalhelp',
  templateUrl: './professionalhelp.component.html',
  styleUrls: ['./professionalhelp.component.css']
})
export class ProfessionalhelpComponent implements OnInit, OnDestroy {
  public lat: number;
  public lng: number;
  public inputLat: number;
  public inputLng: number;
  public brokerName: string;
  public brokerDescription: string;
  public brokerPhone: string;
  public brokerAddress: string;
  public brokerEmail: string;
  loadBrokers: any;
  alert = false;
  error: any;
  coordArray = [];
  contactinformationArray = [];
  markers: any;
  subscription: any;
  isLoading: any;
  brokers = false;
  contractors = false;
  constructor(private geo: GeoService, private afDb: AngularFireDatabase) {
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  disableBrokers = new FormControl(false);
  disableContractors = new FormControl(true);
  ngOnInit() {
    this.getUserLocation();
    this.subscription = this.geo.hits
      .subscribe(hits => this.markers = hits);
   /* this.loadBrokers = this.geo.brokers.subscribe(items => {
      console.log(items);
    });
    console.log(this.loadBrokers);
    */
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat, this.lng);
        this.geo.getLocationsBroker(100, [this.lat, this.lng]);
      });
    }
  }

  getBrokers() {
    this.contractors = false;
    this.brokers = true;
  }
  getContractors() {
    this.contractors = true;
    this.brokers = false;
  }
  createBroker() {
    this.isLoading = true;
   this.coordArray.push(this.inputLat, this.inputLng);
   this.contactinformationArray.push(this.brokerPhone, this.brokerAddress, this.brokerEmail);
    this.geo.createBroker(this.coordArray, this.brokerName, this.brokerDescription, this.contactinformationArray).then( () => {
      this.alert = true;
      this.isLoading = false;
      this.coordArray = null;
      this.contactinformationArray = null;
      this.brokerName = null;
      this.brokerDescription = null;
      this.brokerEmail = null;
      this.brokerAddress = null;
      this.brokerPhone = null;
      this.inputLat = null;
      this.inputLng = null;
    }).catch(err => {
      this.error = err;
      this.isLoading = false;
      this.coordArray = null;
      this.contactinformationArray = null;
      this.brokerName = null;
      this.brokerDescription = null;
      this.brokerEmail = null;
      this.brokerAddress = null;
      this.brokerPhone = null;
      this.inputLat = null;
      this.inputLng = null;
    });
  }

  private seedDatabase() {
    const dummyPoints = [
      [37.9, -122.1],
      [38.7, -122.2],
      [38.1, -122.3],
      [38.3, -122.0],
      [38.7, -122.1]
    ];
    dummyPoints.forEach((val, idx) => {
      const name = `dummy-location-${idx}`;
      const brokerNames = {

      };
      console.log(idx);
      this.geo.setLocationBroker(name, val);
    });
  }
}

