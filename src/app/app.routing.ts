import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {HomeComponent} from './pages/home/home.component';
import {InformationcenterComponent} from './pages/informationcenter/informationcenter.component';
import {StepbystepComponent} from './pages/stepbystep/stepbystep.component';
import {ProfessionalhelpComponent} from './pages/professionalhelp/professionalhelp.component';

const APP_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'hem', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'informationscenter', component: InformationcenterComponent, canActivate: [AuthGuard] },
  { path: 'stegforsteg', component: StepbystepComponent, canActivate: [AuthGuard] },
  { path: 'naradig', component: ProfessionalhelpComponent, canActivate: [AuthGuard] },
  { path: '',   redirectTo: '/hem', pathMatch: 'full' },
];

export const routing = RouterModule.forRoot(APP_ROUTES);