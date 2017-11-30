import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AngularFireModule} from 'angularfire2';
import {routing} from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationcenterComponent } from './pages/informationcenter/informationcenter.component';
import { StepbystepComponent } from './pages/stepbystep/stepbystep.component';
import { ProfessionalhelpComponent } from './pages/professionalhelp/professionalhelp.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyA2V_AQd1R2lbCDfjHzAoSXgg7mNPZCzhs',
  authDomain: 'myhouse-58a88.firebaseapp.com',
  databaseURL: 'https://myhouse-58a88.firebaseio.com',
  projectId: 'myhouse-58a88',
  storageBucket: 'myhouse-58a88.appspot.com',
  messagingSenderId: '178332113016'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HomeComponent,
    InformationcenterComponent,
    StepbystepComponent,
    ProfessionalhelpComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
