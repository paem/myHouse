import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {

  apiKey = "AIzaSyB3eJzNwCvsjZ3ucxgdwT218uK_ZCsnKsU";
  base_url = "https://www.googleapis.com/youtube/v3/search";

  constructor(public http:Http) { }

  youtubeSearch(query){
    return this.http.get(this.base_url+'?q='+query+'&part=snippet&type=video&key='+this.apiKey)
    .map((res:Response) => res.json())
    .map(json => json.items);
  }
}
