import { YoutubeService } from './../../services/youtube.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-informationcenter',
  templateUrl: './informationcenter.component.html',
  styleUrls: ['./informationcenter.component.scss']
})
export class InformationcenterComponent implements OnInit {

  query: any;
  videoList: any;
  message: any;

  constructor(private videos: YoutubeService) {
    this.getVideos();
    console.log(this.getVideos());
  }

  ngOnInit() {
 this.getVideos();
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
