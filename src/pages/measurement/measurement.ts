import { Component } from '@angular/core';
import { NavController, AlertController} from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { ResumePage } from '../resume/resume';

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
    private navCtrl: NavController,
    private alertCtrl: AlertController) {

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
   * finishFlight Action
   * stopNotify and disconnect bluetooth client
   * @return void
   */
  finishFlight() {
    if(this.blePrv.altitudeValues.length > 0) {
      this.blePrv.disconnectDevice()
      .then(() => {
        this.navCtrl.push(ResumePage);
      });
    } else {
      const alert = this.alertCtrl.create({
        title: 'No measures',
        subTitle: 'it seems that you did not receive any measure. Try connect again',
        buttons: [{
          text: 'OK',
          handler: data => {
            this.blePrv.disconnectDevice()
            .then(() => {
              this.navCtrl.pop();
            });
          }
        }]
      });
      alert.present();
    }
   
  }
}


