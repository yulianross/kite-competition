import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';
import { BleProvider } from '../../providers/ble/ble';
import { MeasurementPage } from '../measurement/measurement';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = true;

  showInfoScan: boolean = true;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private blePrv: BleProvider,
    private loadingCtrl: LoadingController,
    public locationPrv: LocationProvider) {

    this.locationPrv.initGeolocation();
  }

  connectRaspberry(device) {
    const loader = this.loadingCtrl.create({
      content: `connecting to ${device.name || 'device'}...`,
      dismissOnPageChange: true
    });

    return new Promise((resolve, reject) => {
      loader.present()
        .then(() => {
          this.blePrv.connect(device)
            .then(() => {
              resolve();
            })
            .catch(() => {
              console.log('ha habido algun probema');
              loader.dismiss();
              reject();
            });
        });
    });
  }

  deviceSelected(device) {
    this.connectRaspberry(device)
      .then(() => {
        this.navCtrl.push(MeasurementPage);
      })
      .catch(() => {
        console.log('hubo algun problema de conexión');
      });
  }

  scanDevices() {
    this.showInfoScan = false;

    this.blePrv.bluetoothIsEnabled()
      .then(() => {
        this.blePrv.scan();
      })
      .catch(() => {
        this.blePrv.showBluetoothSettings()
          .then((res) => {
            console.log(res);
          })
          .catch(() => {
            console.log('error al abrir los settings');
          });
      });
  }
}
