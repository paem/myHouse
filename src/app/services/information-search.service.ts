import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import "rxjs/add/observable/zip";


@Injectable()
export class InformationSearchService {

  constructor(private afDb: AngularFireDatabase) { }

  getInfo(start: BehaviorSubject<string>, end: BehaviorSubject<string>): Observable<any[]>{
    return Observable.zip(start, end).switchMap(param => {
      return this.afDb
      .list("/Information", ref =>
      ref
      .orderByChild("title")
      .limitToFirst(10)
      .startAt(param[0])
      .endAt(param[1])
      ).snapshotChanges()
      .map(changes => {
        return changes.map(c => {
        return { key: c.payload.key, ...c.payload.val() };
        });
        });
        });
      }
    }
