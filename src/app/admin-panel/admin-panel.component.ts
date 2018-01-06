import { ContactInfo } from './../shared/classes/contact-info';
import { FileItem } from './../shared/classes/file-item';
import { Component, OnInit } from '@angular/core';
import {GeoService} from '../services/geo.service';
import {FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {Jsonp} from '@angular/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})

export class AdminPanelComponent implements OnInit {
  public brokerInputLat: number;
  public brokerInputLng: number;
  public brokerName: string = '';
  public brokerDescription: string = '';
  public brokerPhone: string = '';
  public brokerAddress: string = '';
  public brokerEmail: string;
  public brokerImage: FileItem;
  brokerCoordArray = [];
  brokerAlert = false;
  brokerFillInValuesAlert: any;
  error: any;
  isLoading: any;
  selectedFiles: FileList;
  currentUpload: FileItem;
  contactInfo = new ContactInfo();
  apiKey = 'XGzhpth7MvTngPq2IZwcdHH64aB854kx';
  geoCodeResult: any;
  street: any;
  city: any;
  postalCodee: any;
  country: any;
  countries = [ 'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua & Deps', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia Herzegovina',
    'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Rep', 'Chad',
    'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 'Congo {Democratic Rep}', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
    'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
    'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
    'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland {Republic}', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica',
    'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea North', 'Korea South', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho',
    'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Madagascar', 'Malawi', 'Malaysia,', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar, {Burma}', 'Namibia', 'Nauru',
    'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru',
    'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'St Kitts & Nevis', 'St Lucia', 'Saint Vincent & the Grenadines', 'Samoa',
    'San Marino', 'Sao Tome & Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands',
    'Somalia', 'South Africa', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Swaziland', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
    'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad & Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
  ];
  items:any;

  constructor(private geo: GeoService, private _jsonp: Jsonp) { }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  ngOnInit() {

    this.items = this.geo.getBrokerInfo();

  }
  deleteInfo(key:any){
    console.log(key);
    this.geo.deleteBrokerInfo(key);
    
  }

  searchLatLng(country, street, city, postalCode) {
    return this._jsonp.get('http://www.mapquestapi.com/geocoding/v1/address?callback=JSONP_CALLBACK&key=' + this.apiKey + '&location=' + street + ',' + city + ',' + postalCode + ',' + country)
      .map(res => res.json());
  }

  getLatLng(country, street, city, postalCode) {
    this.isLoading = true;
      this.searchLatLng(country, street, city, postalCode).subscribe(
        data => {
          this.geoCodeResult = data.results[0].locations[0].latLng;
          console.log(this.geoCodeResult);
          this.isLoading = false;
        });
  }



  getCoordsBroker() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.brokerInputLat = position.coords.latitude;
        this.brokerInputLng = position.coords.longitude;
        console.log(this.brokerInputLat, this.brokerInputLng);
      });
    }
  }


  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }

  upload(fileItem: FileItem) {
    const storageRef = firebase.storage().ref();
    const filename = Math.floor(Date.now() / 1000);
    const uploadTask = storageRef.child(`Images/${filename}`).put(fileItem.file);

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

  createBroker() {
    const file = this.selectedFiles.item(0)
    this.currentUpload = new FileItem(file);
    this.upload(this.currentUpload);
  }


  saveFileData(item: FileItem) {
   /* if (typeof this.brokerName || this.brokerDescription || this.brokerEmail || this.brokerAddress || this.brokerPhone === 'undefined' || null) {
      this.brokerFillInValuesAlert = true;
    }
    */

    this.isLoading = true;
    this.brokerImage = item;
    this.contactInfo.Adress = this.brokerAddress;
    this.contactInfo.Email = this.brokerEmail;
    this.contactInfo.Phone = this.brokerPhone;

      this.brokerCoordArray.push(this.brokerInputLat, this.brokerInputLng);
      this.geo.createBroker(this.brokerCoordArray, this.brokerName, this.brokerDescription, this.contactInfo, this.brokerImage).then( () => {
        this.brokerAlert = true;
        this.isLoading = false;
        this.brokerCoordArray = null;
        this.contactInfo = null;
        this.brokerName = '';
        this.brokerDescription = '';
        this.brokerEmail = '';
        this.brokerAddress = '';
        this.brokerPhone = '';
        this.brokerInputLat = null;
        this.brokerInputLng = null;
        this.brokerImage = null;
      }).catch(err => {
        this.error = err;
        this.isLoading = false;
        this.brokerCoordArray = null;
        this.contactInfo = null;
        this.brokerName = '';
        this.brokerDescription = '';
        this.brokerEmail = '';
        this.brokerAddress = '';
        this.brokerPhone = '';
        this.brokerInputLat = null;
        this.brokerInputLng = null;
        this.brokerImage = null;
      });
  }








}
