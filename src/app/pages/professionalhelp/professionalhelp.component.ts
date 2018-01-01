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
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lat, this.lng);
        this.geo.getLocationsBroker(this.radius, [this.lat, this.lng]);
        this.geo.getLocationsContractor(this.radius, [this.lat, this.lng]);
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


}

