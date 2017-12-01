import { FirebaseService } from './services/firebase.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import {routing} from './app.routing';
import { LoginComponent } from './pages/login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import {AuthGuard} from './shared/guard/auth.guard';
import { HomeComponent } from './pages/home/home.component';
import { InformationcenterComponent } from './pages/informationcenter/informationcenter.component';
import { StepbystepComponent } from './pages/stepbystep/stepbystep.component';
import { ProfessionalhelpComponent } from './pages/professionalhelp/professionalhelp.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule, MatSidenavModule,
  MatToolbarModule, MatTooltipModule, MatProgressSpinnerModule, MatTabsModule, MatButtonToggleModule
} from '@angular/material';
import { YoutubeService } from './services/youtube.service';
import { HttpModule } from '@angular/http';
import { SafePipe } from './shared/pipes/safe.pipe';

export const firebaseConfig = {
  apiKey: 'AIzaSyA2V_AQd1R2lbCDfjHzAoSXgg7mNPZCzhs',
  authDomain: 'myhouse-58a88.firebaseapp.com',
  databaseURL: 'https://myhouse-58a88.firebaseio.com',
  projectId: 'myhouse-58a88',
  storageBucket: 'myhouse-58a88.appspot.com',
  messagingSenderId: '178332113016'
};

const materialModules = [
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatFormFieldModule,
  MatInputModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatButtonToggleModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidenavComponent,
    HomeComponent,
    InformationcenterComponent,
    StepbystepComponent,
    ProfessionalhelpComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    routing,
    BrowserAnimationsModule,
    FormsModule,
    materialModules
  ],
  providers: [FirebaseService, AuthGuard, YoutubeService],
  bootstrap: [AppComponent],
  exports: [FormsModule],
})
export class AppModule { }