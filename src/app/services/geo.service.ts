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
  loadContractors: any;
  contractors = new BehaviorSubject([]);
  brokers= new BehaviorSubject([]);
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
        const brokerRef: any = this.afDb.object('brokers/' + key);
        brokerRef.valueChanges().subscribe(items => { this.loadBrokers = {
          key: key,
          contactInformation: items.contactInformation,
          name: items.name,
          description: items.description,
          url: items.imageUrl.url
        };
          const currentBrokers = this.brokers.value;
          currentBrokers.push(this.loadBrokers);
          this.brokers.next(currentBrokers);
          console.log(this.brokers);
          const hit = {
            location: location,
            distance: distance,
            name: items.name
          };
          const currentHits = this.hits.value;
          currentHits.push(hit);
          this.hits.next(currentHits);
          console.log(this.hits);
        });
      });
  }

  getLocationsContractor(radius: number, coords: Array<number>) {
    this.geoFireContractor.query({
      center: coords,
      radius: radius
    })
      .on('key_entered', (key, location, distance) => {
        const contractorRef: any = this.afDb.object('contractors/' + key);
        contractorRef.valueChanges().subscribe(items => { this.loadContractors = {
          key: key,
          contactInformation: items.contactInformation,
          name: items.name,
          description: items.description,
          url: items.imageUrl.url
        };
          const currentContractors = this.contractors.value;
          currentContractors.push(this.loadContractors);
          this.contractors.next(currentContractors);
          console.log(this.contractors);
          const hit = {
            location: location,
            distance: distance,
            name: items.name
          };
          const currentHits = this.hits.value;
          currentHits.push(hit);
          this.hits.next(currentHits);
        });
      });
  }

  createBroker(coords: Array<string>, name: string, description: string, contactInformation: Array<string>, url: string) {
     return this.geoFireBroker.set(this.brokerId, coords)
      .then(_ => {
        this.dbrefBrokers.child(this.brokerId).update( {
          name : name,
          description: description,
          contactInformation: contactInformation,
          imageUrl: url
        });
        console.log('brokers updated');
      }).catch(err => console.log(err));
  }

  createContractor(coords: Array<string>, name: string, description: string, contactInformation: Array<string>, url: string) {
    return this.geoFireContractor.set(this.contractorId, coords)
      .then(_ => {
        this.dbrefContractors.child(this.contractorId).update( {
          name : name,
          description: description,
          contactInformation: contactInformation,
          imageUrl: url
        });
        console.log('contractors updated');
      }).catch(err => console.log(err));
  }
}
