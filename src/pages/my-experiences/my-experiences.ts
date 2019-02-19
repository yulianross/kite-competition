import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoaderProvider } from '../../providers/loader/loader';
import { DetailExperiencePage } from '../detail-experience/detail-experience';
@Component({
  selector: 'page-my-experiences',
  templateUrl: 'my-experiences.html',
})
export class MyExperiencesPage {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userPrv: UserProvider,
    private firebasePrv: FirebaseProvider,
    private loaderPrv: LoaderProvider) {

  }

  goToExperience(experience, index) {
    this.navCtrl.push(DetailExperiencePage, { experience, index });
  }

  delete(index) {
    this.loaderPrv.startLoader('deleting experience...')
    .then(() => {
      this.firebasePrv.deleteExperience(index)
      .then(() => {
        this.loaderPrv.dismissLoader();
      });
    }); 
  }

}
