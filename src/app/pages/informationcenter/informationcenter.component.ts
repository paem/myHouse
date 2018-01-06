import { GoogleSearchService } from './../../services/google-search.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { InformationSearchService } from './../../services/information-search.service';
import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-informationcenter',
  templateUrl: './informationcenter.component.html',
  styleUrls: ['./informationcenter.component.scss']
})
export class InformationcenterComponent implements OnInit {

  show:boolean;
  query: any;
  videoList: any;
  message: any;
  gcsesearch: SafeHtml;
  info:any;
  startAt: BehaviorSubject<string|null> = new BehaviorSubject("");
  endAt: BehaviorSubject<string|null> = new BehaviorSubject("\uf8ff");
  lastKeypress: number = 0;

  googleQuery:any;
  googleMessage:any;
  googleList:any;
  isLoading: boolean;
  mainInput:any;

  constructor(private videos: YoutubeService, private ISS:InformationSearchService, private sanitizer:DomSanitizer, private gSS:GoogleSearchService) {
    // this.getVideos();
    // console.log(this.getVideos());
    // console.log(this.getGoogleInfo())
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

  filter(){
    this.show = true;
    // if(this.show == true){
    //   console.log(this.show = false);
    // }if(this.show == false){
    //   console.log(this.show = false);
    // }
  }
  filter2(){
    this.show = false;
  }

  mainSearch(){
    if(this.mainInput == null){
      this.googleMessage = 'Informationen är här';
    }
    else if(this.mainInput != null){
      this.gSS.googleSearch(this.mainInput).subscribe(data => {console.log(this.googleList = data)});
    }
    if (this.mainInput == null) {
      this.message = 'Sök efter videos';
    }
    else if(this.mainInput != null) {
      this.isLoading = true;
   this.videos.youtubeSearch(this.mainInput).subscribe(data => { this.videoList = data , this.isLoading = false; });
  }
  }

  ngOnInit() {
//  this.getVideos();
 this.googleCSE();

 this.ISS.getInfo(this.startAt, this.endAt)
 .subscribe(info => this.info = info)

  }

search($event) {

    let q = $event.target.value
    this.startAt.next(q)
    this.endAt.next(q+"\uf8ff")

}
  clicked() {
     console.log(this.query);
    console.log(this.videoList); }
//   getVideos() {
//     if (this.query == null) {
//       this.message = 'Sök efter videos';
//     }
//     else if(this.query != null) {
//       this.isLoading = true;
//    this.videos.youtubeSearch(this.query).subscribe(data => { this.videoList = data , this.isLoading = false; });
//   }
// }
// getGoogleInfo(){
//   if(this.googleQuery == null){
//     this.googleMessage = 'Informationen är här';
//   }
//   else if(this.googleQuery != null){
//     this.gSS.googleSearch(this.googleQuery).subscribe(data => {console.log(this.googleList = data)});
//   }
// }
}
