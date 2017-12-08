import {Component, OnDestroy, OnInit} from '@angular/core';
import { GeoService } from '../../services/geo.service';
import * as firebase from 'firebase';

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
  coordArray = [];
  contactinformationArray = [];
  markers: any;
  subscription: any;
  isLoading: any;
  newBrokerKey = firebase.database().ref('/locations/brokers/').push().key;
  constructor(private geo: GeoService) {
  }

  ngOnInit() {
    this.getUserLocation();
    this.subscription = this.geo.hits
      .subscribe(hits => this.markers = hits);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.geo.getLocationsBroker(500, [this.lat, this.lng]);
      });
    }
  }

  createBroker() {
    this.coordArray.push(this.inputLat, this.inputLng);
    this.contactinformationArray.push(this.brokerPhone, this.brokerAddress, this.brokerEmail);
    this.geo.createBroker(this.newBrokerKey, this.coordArray, this.brokerName, this.brokerDescription, this.contactinformationArray);
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

