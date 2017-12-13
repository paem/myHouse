import { FileItem } from './../../shared/classes/file-item';
import { FirebaseService } from './../../services/firebase.service';
import { Item } from './../../shared/classes/item';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';


import * as firebase from 'firebase/app';


@Component({
  selector: 'app-create-info',
  templateUrl: './create-info.component.html',
  styleUrls: ['./create-info.component.css']
})
export class CreateInfoComponent implements OnInit {

  item: Item = new Item();

type:any;
tab:any;

selectedFiles: FileList;
currentUpload: FileItem;

detectFiles(event) {
  this.selectedFiles = event.target.files;
}

constructor(private fbService: FirebaseService) { }

uploadSingle() {
  let file = this.selectedFiles.item(0)
  this.currentUpload = new FileItem(file);
  this.upload(this.currentUpload)

}


upload(fileItem:FileItem){
  
  let storageRef = firebase.storage().ref();
  let uploadTask = storageRef.child(`Images/${fileItem.file.name}`).put(fileItem.file);

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
    (snapshot) =>  {
      // upload in progress
       fileItem.progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100
    },
    (error) => {
      // upload failed
      console.log(error)
    },
    () => {
      // upload success
      fileItem.url = uploadTask.snapshot.downloadURL
      fileItem.name = fileItem.file.name
      this.saveFileData(fileItem)
    }
  );
}
private saveFileData(item: FileItem) {
//  this.image = item;
 console.log()
 this.item.tab = this.tab;
 this.item.type = this.type; 
  console.log(this.item);
  this.item.image = item;
  console.log(this.item.image = item);

  this.fbService.createInfo(this.item);
  this.item = new Item();
  this.tab = null;
  this.type = null;
  this.currentUpload =  null;
}

    types = [
      'Hus',
      'Bostadsrätt',
    ];
    tabs = [
      'Innan Köp',
      'Under Köp',
      'Efter Köp',      
    ];
  
  
    ngOnInit() {
      //default
      // this.item.image = 'http://www.casas-bostad.com/wp-content/uploads/2015/07/slide-1-1024x512.jpg'
    }
    createInfo(){
      let file = this.selectedFiles.item(0)
      this.currentUpload = new FileItem(file);
      this.upload(this.currentUpload)
      
     
    }

  }
