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
  contractorContactInformationArray = [];
  brokerContactInformationArray = [];
  
  contractorCoordArray = [];
  contractorAlert = false;
  brokerFillInValuesAlert: any;
  contractorFillInValuesAlert: any;
  error: any;
  isLoading: any;
  proceed: any;
  
  selectedFiles: FileList;
  currentUpload: FileItem;
  
  constructor(private geo: GeoService) {
   
   }
   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  ngOnInit() {
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
      

      this.contractorCoordArray.push(this.contractorInputLat, this.contractorInputLng);
      this.contractorContactInformationArray.push(this.contractorPhone, this.contractorAddress, this.contractorEmail);
      this.geo.createContractor(this.contractorCoordArray, this.contractorName, this.contractorDescription, this.contractorContactInformationArray, this.contractorImage).then( () => {
        this.contractorAlert = true;
        this.isLoading = false;
        this.contractorCoordArray = null;
        this.contractorContactInformationArray = null;
        this.contractorName = '';
        this.contractorDescription = '';
        this.contractorEmail = '';
        this.contractorAddress = '';
        this.contractorPhone = '';
        this.contractorInputLat = null;
        this.contractorInputLng = null;
      }).catch(err => {
        this.error = err;
        this.isLoading = false;
        this.contractorCoordArray = null;
        this.contractorContactInformationArray = null;
        this.contractorName = '';
        this.contractorDescription = '';
        this.contractorEmail = '';
        this.contractorAddress = '';
        this.contractorPhone = '';
        this.contractorInputLat = null;
        this.contractorInputLng = null;
    });
  }
}


