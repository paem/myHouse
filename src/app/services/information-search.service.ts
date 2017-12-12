import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Injectable()
export class InformationSearchService {

  constructor(private afDb: AngularFireDatabase) { }

  getInfo(start, end): Observable<any>{
    return this.afDb.list('/Information', ref => ref.orderByChild('title').startAt(start).endAt(end)).valueChanges();
  }

}
