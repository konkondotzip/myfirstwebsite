import { Routes } from '@angular/router';
import { KeyboardTesterComponent } from './keyboard-stuff/tester/keyboard-tester.component';
import { MainPageComponent } from './keyboard-stuff/main-page/main-page.component';
import { InfoComponent } from './keyboard-stuff/info/info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'keyboard-main-page', component: MainPageComponent},
  {path: 'keyboard-tester', component: KeyboardTesterComponent},
  {path: 'info', component: InfoComponent},
  {path: '**', component: PageNotFoundComponent}
];
