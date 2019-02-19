import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlobalRankingPage } from './global-ranking';

@NgModule({
  declarations: [
    GlobalRankingPage,
  ],
  imports: [
    IonicPageModule.forChild(GlobalRankingPage),
  ],
})
export class GlobalRankingPageModule {}
