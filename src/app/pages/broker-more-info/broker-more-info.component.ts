import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';
import {Firm} from '../../shared/classes/firm';

@Component({
  selector: 'app-broker-more-info',
  templateUrl: './broker-more-info.component.html',
  styleUrls: ['./broker-more-info.component.css']
})
export class BrokerMoreInfoComponent implements OnInit {
  key: any;
  paramsSubscription: Subscription;
  brokerRef: any;
  brokerLocationRef: any;
  isLoading = false;
  brokers: any;
  brokerLocation: any;
  lat: any;
  lng: any;
  locationName: any;
  constructor( private route: ActivatedRoute, private afDb: AngularFireDatabase) { }

  ngOnInit() {
    this.key = this.route.snapshot.params['key'];
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.key = params['key'];
      });
    this.getBrokerDetailsByKey();
    this.getBrokerLocation();
  }

  getBrokerLocation() {
    this.brokerLocationRef = this.afDb.object('locations/brokers/' + this.key);
    const location$ = this.brokerLocationRef.valueChanges();
    location$.subscribe( location => {
      this.lat = location.l[0];
      this.lng = location.l[1];
    });
  }

  getBrokerDetailsByKey() {
    this.isLoading = true;
    this.brokerRef = this.afDb.object('brokers/' + this.key);
    const items$: Observable<Firm> = this.brokerRef.valueChanges();
    items$.subscribe( items => {
      this.brokers = items;
      this.locationName = items.name;
      console.log(this.brokers);
      this.isLoading = false;
    });
  }
}
