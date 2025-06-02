import { Routes } from '@angular/router';
import { KeyboardTesterComponent } from './keyboard-stuff/tester/keyboard-tester.component';
import { MainPageComponent } from './keyboard-stuff/main-page/main-page.component';
import { InfoComponent } from './keyboard-stuff/info/info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SecretTetrisGameComponent } from './secret-tetris-game/secret-tetris-game.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'keyboards', component: MainPageComponent},
  {path: 'keyboards/tester', component: KeyboardTesterComponent},
  {path: 'keyboards/info', component: InfoComponent},
  {path: 'tetris', component: SecretTetrisGameComponent},
  {path: '**', component: PageNotFoundComponent}
];
