import { ContractorComponent } from './admin-panel/contractor/contractor.component';
import { HouseComponent } from './pages/stepbystep/house/house.component';
import { BostadComponent } from './pages/stepbystep/bostad/bostad.component';
import { InformationSearchService } from './services/information-search.service';
import { ShowInfoComponent } from './admin-panel/show-info/show-info.component';
import { CreateInfoComponent } from './admin-panel/create-info/create-info.component';
import { ProfileComponent } from './profile/profile.component';
import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';
import {routing} from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import {AuthGuard} from './shared/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { InformationcenterComponent } from './pages/informationcenter/informationcenter.component';
import { StepbystepComponent } from './pages/stepbystep/stepbystep.component';
import { ProfessionalhelpComponent } from './pages/professionalhelp/professionalhelp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
import { MaterialModule } from './material.module';
import { YoutubeService } from './services/youtube.service';
import { HttpModule } from '@angular/http';
import { SafePipe } from './shared/pipes/safe.pipe';
import { AgmCoreModule } from '@agm/core';
import {GeoService} from './services/geo.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UpdateInfoComponent } from './admin-panel/update-info/update-info.component';
import { GoogleSearchService } from './services/google-search.service';
import { BrokerMoreInfoComponent } from './pages/broker-more-info/broker-more-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    InformationcenterComponent,
    StepbystepComponent,
    ProfessionalhelpComponent,
    SafePipe,
    ProfileComponent,
    BostadComponent,
    HouseComponent,
    AdminPanelComponent,
    CreateInfoComponent,
    UpdateInfoComponent,
    ShowInfoComponent,
    ContractorComponent,
    BrokerMoreInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyA2V_AQd1R2lbCDfjHzAoSXgg7mNPZCzhs',
      authDomain: 'myhouse-58a88.firebaseapp.com',
      databaseURL: 'https://myhouse-58a88.firebaseio.com',
      projectId: 'myhouse-58a88',
      storageBucket: 'myhouse-58a88.appspot.com',
      messagingSenderId: '178332113016'
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    routing,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCQbC86Nv2dHAU3hNBJZ1hOVn4O1NYj7Gg'
    })
  ],
  providers: [FirebaseService, AuthGuard, YoutubeService, GeoService, GoogleSearchService, InformationSearchService],
  bootstrap: [AppComponent],
  exports: [FormsModule],
})
export class AppModule { }
