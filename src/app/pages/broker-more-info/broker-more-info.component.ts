import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-broker-more-info',
  templateUrl: './broker-more-info.component.html',
  styleUrls: ['./broker-more-info.component.css']
})
export class BrokerMoreInfoComponent implements OnInit {
  key: any;
  paramsSubscription: Subscription;
  brokerRef: any;
  isLoading: any;
  brokers: any;
  constructor( private route: ActivatedRoute, private afDb: AngularFireDatabase) { }

  ngOnInit() {
    this.key = this.route.snapshot.params['key'];
    this.paramsSubscription = this.route.params
      .subscribe((params: Params) => {
        this.key = params['key'];
      });
    this.getBrokerDetailsByKey();
  }

  getBrokerDetailsByKey() {
    this.isLoading = true;
    this.brokerRef = this.afDb.list('brokers/' + this.key);
    const items$ = this.brokerRef.valueChanges();
    items$.subscribe( items => {
      this.brokers = items;
      this.isLoading = false;
    });
  }
}
