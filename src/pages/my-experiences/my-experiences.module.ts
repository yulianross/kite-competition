import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyExperiencesPage } from './my-experiences';

@NgModule({
  declarations: [
    MyExperiencesPage,
  ],
  imports: [
    IonicPageModule.forChild(MyExperiencesPage),
  ],
})
export class MyExperiencesPageModule {}
