import { Routes } from '@angular/router';
import { KeyboardTesterComponent } from './keyboard-stuff/tester/keyboard-tester.component';
import { MainPageComponent } from './keyboard-stuff/main-page/main-page.component';
import { InfoComponent } from './keyboard-stuff/info/info.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SecretTetrisGameComponent } from './secret-tetris-game/secret-tetris-game.component';
import { CommissionsComponent } from './commissions/commissions.component';
import { StoriesComponent } from './stories/stories.component';
import { FoxAndStickComponent } from './stories/fox-and-stick/fox-and-stick.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, data: { showLayout: true } },
  { path: 'keyboards', component: MainPageComponent, data: { showLayout: true } },
  { path: 'keyboards/tester', component: KeyboardTesterComponent, data: { showLayout: true } },
  { path: 'keyboards/info', component: InfoComponent, data: { showLayout: true } },
  { path: 'tetris', component: SecretTetrisGameComponent, data: { showLayout: true } },
  { path: 'commissions', component: CommissionsComponent, data: { showLayout: true } },
  { path: 'stories', component: StoriesComponent, data: { showLayout: false } },
  { path: 'stories/fox-and-stick', component: FoxAndStickComponent, data: { showLayout: false } },
  { path: '**', component: PageNotFoundComponent, data: { showLayout: false } },
];
