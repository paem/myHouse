import { BostadComponent } from './pages/stepbystep/bostad/bostad.component';
import { HouseComponent } from './pages/stepbystep/house/house.component';
import { ProfileComponent } from './profile/profile.component';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {InformationcenterComponent} from './pages/informationcenter/informationcenter.component';
import {StepbystepComponent} from './pages/stepbystep/stepbystep.component';
import {ProfessionalhelpComponent} from './pages/professionalhelp/professionalhelp.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { UpdateInfoComponent } from './admin-panel/update-info/update-info.component';
import {BrokerMoreInfoComponent} from './pages/broker-more-info/broker-more-info.component';
import {ContractorMoreInfoComponent} from './pages/contractor-more-info/contractor-more-info.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hem', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'informationscenter', component: InformationcenterComponent, canActivate: [AuthGuard] },
  { path: 'stegforsteg', component: StepbystepComponent, canActivate: [AuthGuard] },
  { path: 'stegforsteg/hus', component: HouseComponent, canActivate: [AuthGuard] },
  { path: 'stegforsteg/bostad', component: BostadComponent, canActivate: [AuthGuard] },
  { path: 'naradig', component: ProfessionalhelpComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'edit/:key', component: UpdateInfoComponent, canActivate: [AuthGuard]},
  { path: 'details-brokers/:key', component: BrokerMoreInfoComponent, canActivate: [AuthGuard]},
  { path: 'details-contractors/:key', component: ContractorMoreInfoComponent, canActivate: [AuthGuard]},
  { path: '',   redirectTo: '/hem', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);
