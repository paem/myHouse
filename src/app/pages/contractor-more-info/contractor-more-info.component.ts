import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params} from '@angular/router';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {Firm} from '../../shared/classes/firm';

@Component({
  selector: 'app-contractor-more-info',
  templateUrl: './contractor-more-info.component.html',
  styleUrls: ['./contractor-more-info.component.css']
})
export class ContractorMoreInfoComponent implements OnInit {
  key: any;
  paramsSubscription: Subscription;
  contractorRef: any;
  contractorLocationRef: any;
  isLoading = false;
  contractors: any;
  lat: any;
  lng: any;
  locationName: any;
  constructor(private route: ActivatedRoute, private afDb: AngularFireDatabase) { }

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
    this.contractorLocationRef = this.afDb.object('locations/contractors/' + this.key);
    const location$ = this.contractorLocationRef.valueChanges();
    location$.subscribe( location => {
      this.lat = location.l[0];
      this.lng = location.l[1];
    });
  }

  getBrokerDetailsByKey() {
    this.isLoading = true;
    this.contractorRef = this.afDb.object('contractors/' + this.key);
    const items$: Observable<Firm> = this.contractorRef.valueChanges();
    items$.subscribe( items => {
      this.contractors = items;
      this.locationName = items.name;
      console.log(this.contractors);
      this.isLoading = false;
    });
  }
}
