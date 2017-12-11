import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import * as GeoFire from 'geofire';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as firebase from 'firebase';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class GeoService {
  dbrefBrokers: any;
  brokerId: any;
  dbrefContractors: any;
  contractorId: any;
  dbRefLocationBroker: any;
  dbRefLocationContractor: any;
  geoFireBroker: any;
  geoFireContractor: any;
  loadBrokers: any;
  brokers: any;
  hits = new BehaviorSubject([]);
  constructor(private afDb: AngularFireDatabase) {
    this.dbrefBrokers = firebase.database().ref('/brokers');
    this.brokerId = this.dbrefBrokers.push().key;
    this.dbRefLocationBroker = firebase.database().ref('/locations/brokers');
    this.dbrefContractors = firebase.database().ref('/contractors');
    this.contractorId = this.dbrefContractors.push().key;
    this.dbRefLocationContractor = firebase.database().ref('/locations/contractors');
    this.geoFireBroker = new GeoFire(this.dbRefLocationBroker);
    this.geoFireContractor = new GeoFire(this.dbRefLocationContractor);
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
        const brokerRef: AngularFireList<any> = this.afDb.list('brokers/' + key);
        this.brokers = brokerRef.snapshotChanges().map(actions => {
          return actions.map(action => ({ key: action.payload.key, ... action.payload.val() }));
        }).subscribe(items => {
          // får inte ur värdena bara nyckelnamnet om jag tar bort det som ligger under här
          // så blir allt uppdelat så konstigt..sen vet jag inte hur man ska hämta dem i professionalhelp.ts sen heller men
          console.log(items.map(item => item.key));
        });
        const hit = {
          location: location,
          distance: distance
        };
        const currentHits = this.hits.value;
        currentHits.push(hit);
        this.hits.next(currentHits);
        console.log(this.hits);
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

  createBroker(coords: Array<string>, name: string, description: string, contactInformation: Array<string>) {
     return this.geoFireBroker.set(this.brokerId, coords)
      .then(_ => {
        this.dbrefBrokers.child(this.brokerId).update( {
          name : name,
          description: description,
          contactInformation: contactInformation
        });
        console.log('brokers updated');
      }).catch(err => console.log(err));
  }
}
