import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
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
    private storagePrv: StorageProvider) {

  }

  goToExperience(experience, index) {
    this.navCtrl.push(DetailExperiencePage, { experience, index });
  }

  delete(index) {
    this.storagePrv.deleteExperience(index)
    .then(() => {
      // quitar ruleta de carga
    });
  }

}
