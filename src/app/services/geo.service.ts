import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as GeoFire from 'geofire';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FirebaseApp } from 'angularfire2';

@Injectable()
export class GeoService {
  dbRefBroker: any;
  dbRefContractor: any;
  geoFireBroker: any;
  geoFireContractor: any;
  hits = new BehaviorSubject([]);
  constructor(private db: AngularFireDatabase, private fb: FirebaseApp) {
    this.dbRefBroker = this.fb.database().ref('/locations/brokers');
    this.dbRefContractor = this.fb.database().ref('/locations/contractors');
    this.geoFireBroker = new GeoFire(this.dbRefBroker);
    this.geoFireContractor = new GeoFire(this.dbRefContractor);
  }
  setLocationBroker(key: string, coords: Array<number>) {
    this.geoFireBroker.set(key, coords)
      .then(_ => console.log('location updated')).catch(err => console.log(err));
  }

  setLocationContractor(key: string, coords: Array<number>) {
    this.geoFireContractor.set(key, coords).then(_ => console.log('location updated')).catch(err => console.log(err));
  }
  getLocationsBroker(radius: number, coords: Array<number>) {
    this.geoFireBroker.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {
        const hit = {
          location: location,
          distance: distance
        };
        const currentHits = this.hits.value;
        currentHits.push(hit);
        this.hits.next(currentHits);
      });
  }

  getLocationsContractor(radius: number, coords: Array<number>) {
    this.geoFireContractor.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {
        const hit = {
          location: location,
          distance: distance
        };
        const currentHits = this.hits.value;
        currentHits.push(hit);
        this.hits.next(currentHits);
      });
  }

  createBroker(key: string, coords: Array<number>, name: string, description: string, contactInformation: Array<string>) {
    this.geoFireBroker.update(key, coords, name, description, contactInformation)
      .then(_ => console.log('location updated')).catch(err => console.log(err));
  }
}
