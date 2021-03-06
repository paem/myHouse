import { ContactInfo } from './../../shared/classes/contact-info';
import { FileItem } from '../../shared/classes/file-item';
import { Component, OnInit } from '@angular/core';
import {GeoService} from '../../services/geo.service';
import * as firebase from 'firebase';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['./contractor.component.css']
})
export class ContractorComponent implements OnInit {

  public contractorInputLat: number;
  public contractorInputLng: number;
  public contractorName: string;
  public contractorDescription: string;
  public contractorPhone: string;
  public contractorAddress: string;
  public contractorEmail: string;
  public contractorImage: FileItem;
  
  contractorCoordArray = [];
  contractorAlert = false;
  brokerFillInValuesAlert: any;
  contractorFillInValuesAlert: any;
  error: any;
  isLoading: any;
  proceed: any;
  
  selectedFiles: FileList;
  currentUpload: FileItem;

  contactInfo = new ContactInfo();

  items:any;

  constructor(private geo: GeoService) {
   
   }
   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
    this.items = this.geo.getContractorInfo();

  }
  deleteInfo(key:any){
    console.log(key)
    this.geo.deleteContractorInfo(key);
    
  }
 

  getCoordsContractor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.contractorInputLat = position.coords.latitude;
        this.contractorInputLng = position.coords.longitude;
      });
    }
  }
  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }
  

  upload(fileItem:FileItem){
    let storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000)
    let uploadTask = storageRef.child(`Images/${filename}`).put(fileItem.file);
  
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
        fileItem.name = filename.toString();
        this.saveFileData(fileItem)
      }
    );
  }
  
  createContractor(){
    let file = this.selectedFiles.item(0)
    this.currentUpload = new FileItem(file);
    this.upload(this.currentUpload);
  }


  saveFileData(item: FileItem) {

   /* if (this.contractorName || this.contractorDescription || this.contractorEmail || this.contractorAddress || this.contractorPhone == null) {
      this.contractorFillInValuesAlert = true;
    }
    */
      this.isLoading = true;
      this.contractorImage = item;

      this.contactInfo.Adress = this.contractorAddress;
      this.contactInfo.Email = this.contractorEmail;
      this.contactInfo.Phone = this.contractorPhone;

      this.contractorCoordArray.push(this.contractorInputLat, this.contractorInputLng);
      this.geo.createContractor(this.contractorCoordArray, this.contractorName, this.contractorDescription, this.contactInfo, this.contractorImage).then( () => {
        this.contractorAlert = true;
        this.isLoading = false;
        this.contractorCoordArray = null;
        this.contactInfo = null;
        this.contractorName = '';
        this.contractorDescription = '';
        this.contractorEmail = '';
        this.contractorAddress = '';
        this.contractorPhone = '';
        this.contractorInputLat = null;
        this.contractorInputLng = null;
        this.contractorImage = null;
      }).catch(err => {
        this.error = err;
        this.isLoading = false;
        this.contractorCoordArray = null;
        this.contactInfo = null;
        this.contractorName = '';
        this.contractorDescription = '';
        this.contractorEmail = '';
        this.contractorAddress = '';
        this.contractorPhone = '';
        this.contractorInputLat = null;
        this.contractorInputLng = null;
        this.contractorImage = null;
    });
  }
}


