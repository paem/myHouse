import {Component, OnDestroy, OnInit} from '@angular/core';
import { GeoService } from '../../services/geo.service';

@Component({
  selector: 'app-professionalhelp',
  templateUrl: './professionalhelp.component.html',
  styleUrls: ['./professionalhelp.component.css']
})
export class ProfessionalhelpComponent implements OnInit, OnDestroy {
  lat: number;
  lng: number;
  markers: any;
  subscription: any;
  isLoading: any;
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

  createBroker(key: string, coords: Array<number>, name: string, description: string, contactInformation: Array<string>) {
    this.geo.createBroker(key, coords, name, description, contactInformation);
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

