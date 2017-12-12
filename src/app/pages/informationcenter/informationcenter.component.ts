import { InformationSearchService } from './../../services/information-search.service';
import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-informationcenter',
  templateUrl: './informationcenter.component.html',
  styleUrls: ['./informationcenter.component.scss']
})
export class InformationcenterComponent implements OnInit {

  query: any;
  videoList: any;
  message: any;
  gcsesearch: SafeHtml;
  info:any;
  startAt = new Subject();
  endAt = new Subject();
  lastKeypress: number = 0;

  constructor(private videos: YoutubeService, private ISS:InformationSearchService, private sanitizer:DomSanitizer) {
    this.getVideos();
    console.log(this.getVideos());
  }
  googleCSE(){
    this.gcsesearch = this.sanitizer.bypassSecurityTrustHtml("<gcse:search></gcse:search>");    
    var cx = '009919926379902841576:myydqnu_qyk';
    var gcse = document.createElement('script');
    gcse.type = 'text/javascript';
    gcse.async = true;
    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(gcse, s);
  }

  ngOnInit() {
 this.getVideos();
 this.googleCSE();

 this.ISS.getInfo(this.startAt, this.endAt)
 .subscribe(info => this.info = info)

  }
  
search($event) {
  if ($event.timeStamp - this.lastKeypress > 200) {
    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")
  }
  this.lastKeypress = $event.timeStamp
}
  clicked() {
     console.log(this.query);
    console.log(this.videoList); }
  getVideos() {
    if (this.query == null) {
      this.message = 'Sök efter videos';
    }
    else if(this.query != null) {
   this.videos.youtubeSearch(this.query).subscribe(data => { this.videoList = data
    });
  }
}
}
