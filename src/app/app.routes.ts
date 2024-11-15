import { Routes } from '@angular/router';
import { KeyboardTesterComponent } from './keyboard-tester/keyboard-tester.component';
import { MainPageComponent } from './main-page/main-page.component';
import { InfoComponent } from './info/info.component';
import { ContactComponent } from './contact/contact.component';

export const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'main-page', component: MainPageComponent},
  {path: 'keyboard-tester', component: KeyboardTesterComponent},
  {path: 'info', component: InfoComponent},
  {path: 'contact', component: ContactComponent}
];
