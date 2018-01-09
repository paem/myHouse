import {Component, OnDestroy, OnInit} from '@angular/core';
import { GeoService } from '../../services/geo.service';
import * as firebase from 'firebase';
import {FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase} from 'angularfire2/database';
import {fadeInAnimation} from '../../shared/animations/fadeIn.animation';

@Component({
  selector: 'app-professionalhelp',
  templateUrl: './professionalhelp.component.html',
  styleUrls: ['./professionalhelp.component.css'],
  animations: [fadeInAnimation],
})
export class ProfessionalhelpComponent implements OnInit, OnDestroy {
  public lat: number;
  public lng: number;
  public currentLat: number;
  public currentLng: number;
  loadBrokers: any;
  loadContractors: any;
  markers: any;
  subscription: any;
  subscription2: any;
  subscription3: any;
  isLoading: any;
  brokers = false;
  contractors = false;
  radius: number;
  max = 300;
  min = 20;
  thumbLabel = true;
  brokerIndeterminate = false;
  contractorIndeterminate = false;
  chooseCity = [
    {name: 'Borås', lat: 57.72101, lng: 12.9401},
    {name: 'Borlänge', lat: 60.4858, lng: 15.43714},
    {name: 'Bromma', lat: 59.34, lng: 17.94},
    {name: 'Eskilstuna', lat: 59.36661, lng: 16.5077},
    {name: 'Falun', lat: 60.60357, lng: 15.62597},
    {name: 'Gävle', lat: 60.67452, lng: 17.14174},
    {name: 'Göteborg', lat: 57.70716, lng: 11.96679},
    {name: 'Halmstad', lat: 56.67446, lng: 12.85676},
    {name: 'Haninge', lat: 59.16775, lng: 18.14478},
    {name: 'Helsingborg', lat: 56.04673, lng: 12.69437},
    {name: 'Huddinge', lat: 59.23705, lng: 17.98192},
    {name: 'Jönköping', lat: 57.78145, lng: 14.15618},
    {name: 'Kalmar', lat: 56.66157, lng: 16.36163},
    {name: 'Karlskoga', lat: 59.32667, lng: 14.52386},
    {name: 'Karlskrona', lat: 56.16156, lng: 15.58661},
    {name: 'Karlstad', lat: 59.3793, lng: 13.50357},
    {name: 'Landskrona', lat: 55.8708, lng: 12.83016},
    {name: 'Lidingö', lat: 59.36667, lng: 18.13333},
    {name: 'Linköping', lat: 58.41086, lng: 15.62157},
    {name: 'Luleå', lat: 65.58415, lng: 22.15465},
    {name: 'Lund', lat: 55.70584, lng: 13.19321},
    {name: 'Majorna', lat: 57.69195, lng: 11.91605},
    {name: 'Malmö', lat: 55.60587, lng: 13.00073},
    {name: 'Mölndal', lat: 57.6554, lng: 12.01378},
    {name: 'Motala', lat: 58.53706, lng: 15.03649},
    {name: 'Norrköping', lat: 58.59419, lng: 16.1826},
    {name: 'Nyköping', lat: 58.753, lng: 17.00788},
    {name: 'Östermalm', lat: 59.33879, lng: 18.08487},
    {name: 'Örebro', lat: 59.27412, lng: 15.2066},
    {name: 'Örnsköldsvik', lat: 63.29091, lng: 18.71525},
    {name: 'Östersund', lat: 63.1792, lng: 14.63566},
    {name: 'Partille', lat: 57.7395, lng: 12.10642},
    {name: 'Skellefteå', lat: 64.75067, lng: 20.95279},
    {name: 'Skövde', lat: 58.39118, lng: 13.84506},
    {name: 'Södertälje', lat: 59.19554, lng: 17.62525},
    {name: 'Sollentuna', lat: 59.42804, lng: 17.95093},
    {name: 'Solna', lat: 59.36004, lng: 18.00086},
    {name: 'Stockholm', lat: 59.334591, lng: 18.063240},
    {name: 'Sundbyberg', lat: 59.36128, lng: 17.97114},
    {name: 'Sundsvall', lat: 62.39129, lng: 17.3063},
    {name: 'Täby', lat: 59.4439, lng: 18.06872},
    {name: 'Trollhättan', lat: 58.28365, lng: 12.28864},
    {name: 'Tumba', lat: 59.19858, lng: 17.83317},
    {name: 'Uddevalla', lat: 58.34784, lng: 11.9424},
    {name: 'Umeå', lat: 63.82842, lng: 20.25972},
    {name: 'Upplands Väsby', lat: 59.51839, lng: 17.91128},
    {name: 'Uppsala', lat: 59.85882, lng: 17.63889},
    {name: 'Växjö', lat: 56.87767, lng: 14.80906},
    {name: 'Västerås', lat: 59.61617 , lng: 16.55276},

  ];
  constructor(private geo: GeoService, private afDb: AngularFireDatabase) {
  }

  disableBrokers = new FormControl(false);
  disableContractors = new FormControl(true);
  ngOnInit() {
    if (this.radius == null) {
      this.radius = 30;
    }
    this.getUserLocation();
    this.subscription = this.geo.hits
      .subscribe(hits => this.markers = hits);
    this.subscription2 = this.geo.brokers.subscribe( items => this.loadBrokers = items);
    console.log(this.loadBrokers);
    this.subscription3 = this.geo.contractors.subscribe( items => this.loadContractors = items);
    console.log(this.loadContractors);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
    this.geo.brokers.value.pop();
    this.geo.contractors.value.pop();
    this.geo.hits.value.pop();
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.currentLat = position.coords.latitude;
        this.currentLng = position.coords.longitude;
        console.log(this.lat, this.lng);
        this.geo.getLocationsBroker(this.radius, [this.lat, this.lng]);
        this.geo.getLocationsContractor(this.radius, [this.lat, this.lng]);
      });
    }
  }

  changeRadius(newVal) {
    this.radius = newVal;
    this.geo.brokers.value.pop();
    this.geo.contractors.value.pop();
    this.geo.hits.value.pop();
    this.loadBrokers = null;
    this.loadContractors = null;
    this.isLoading = true;
    this.geo.getLocationsBroker(this.radius, [this.lat, this.lng]);
    this.geo.getLocationsContractor(this.radius, [this.lat, this.lng]);
    this.isLoading = false;
  }
  changeCoords(newLat, newLng) {
      this.lat = newLat;
      this.lng = newLng;
      this.loadBrokers = null;
      this.loadContractors = null;
      this.geo.brokers.value.pop();
      this.geo.contractors.value.pop();
      this.geo.hits.value.pop();
      this.isLoading = true;
      this.geo.getLocationsBroker(this.radius, [newLat, newLng]);
      this.geo.getLocationsContractor(this.radius, [newLat, newLng]);
      console.log(newLat, newLng);
      this.isLoading = false;
  }
  getBrokers() {
    this.brokerIndeterminate = true;
    this.contractorIndeterminate = false;
    this.contractors = false;
    this.brokers = true;
  }
  getContractors() {
    this.contractorIndeterminate = true;
    this.brokerIndeterminate = false;
    this.contractors = true;
    this.brokers = false;
  }


}

