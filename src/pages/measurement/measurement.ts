import { Component } from '@angular/core';
import { NavController, AlertController, NavParams} from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { UsbProvider } from '../../providers/usb/usb';

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

  connection: string;
  
  constructor(
    private blePrv: BleProvider,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private usbPrv: UsbProvider) {

      this.connection = navParams.get('connection');
  }

  /**
  * backButtonAction
  * it executes when the android hardware button is pressed. The event is registrated 
  * in app.component.ts
  * @return void
  */
  backButtonAction() {
    if (this.connection === 'bluetooth') {
      this.blePrv.disconnectDevice()
      .then(() => {
        this.navCtrl.pop();
      });
    } else {
      this.usbPrv.disconnect()
      .then(() => {
        this.navCtrl.pop();
      })
    } 
  }

  /**
   * finishFlight Action
   * stopNotify and disconnect bluetooth client
   * @return void
   */
  finishFlight() {
    if (this.connection === 'bluetooth') {
      if(this.blePrv.altitudeValues.length > 0) {
        this.blePrv.disconnectDevice()
        .then(() => {
          this.navCtrl.push(ResumePage, { altitudes: this.blePrv.altitudeValues });
        });
      } else {
        this.showAlertNoValues(this.connection);
      }
    } else {
      if (this.usbPrv.altitudeValues.length > 0) {
        this.usbPrv.disconnect()
        .then(() => {
          this.navCtrl.push(ResumePage, { altitudes: this.usbPrv.altitudeValues });
        });
      } else {
        this.showAlertNoValues(this.connection);
      }
    }
  }

  showAlertNoValues(connection) {
    const alert = this.alertCtrl.create({
      title: 'No measures',
      subTitle: 'it seems that you did not receive any measure. Try connect again',
      buttons: [{
        text: 'OK',
        handler: data => {
          if (connection === 'bluetooth') {
            this.blePrv.disconnectDevice()
            .then(() => {
              this.navCtrl.pop();
            });
          } else {
            this.usbPrv.disconnect()
            .then(() => {
              this.navCtrl.pop();
            })
          }
        }
      }]
    });
    alert.present();
  }
}


