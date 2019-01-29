import { Component } from '@angular/core';
import { IonicPage , NavController} from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { ResumePage } from '../resume/resume';

@IonicPage()
@Component({
  selector: 'page-measurement',
  templateUrl: 'measurement.html',
})
export class MeasurementPage {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = false;
  
  constructor(
    private blePrv: BleProvider,
    private navCtrl: NavController) {

  }

  /**
  * backButtonAction
  * it executes when the android hardware button is pressed. The event is registrated 
  * in app.component.ts
  * @return void
  */
  backButtonAction() {
    this.blePrv.disconnectDevice()
    .then(() => {
      this.navCtrl.pop();
    });
  }

  /**
   * disconnect Action
   * stopNotify and disconnect bluetooth client
   * @return void
   */
  disconnect() {
    this.blePrv.disconnectDevice()
    .then(() => {
      this.navCtrl.push(ResumePage);
    });
  }
}


