import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { MeasurementPage } from '../measurement/measurement';
import { UserProvider } from '../../providers/user/user';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoaderProvider } from '../../providers/loader/loader';
import { UsbProvider } from '../../providers/usb/usb';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = true;

  showInfoScan: boolean = true;
  currentAltitude: number = 0;
  mode: string = 'bluetooth';

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private blePrv: BleProvider,
    private loaderPrv: LoaderProvider,
    private userPrv: UserProvider,
    private firebasePrv: FirebaseProvider,
    private usbPrv: UsbProvider) {
 
  }

  ngOnInit() {
    if (!this.userPrv.userfirebaseLoaded) {
      this.firebasePrv.loadUser()
      .then(() => {
        const toast = this.toastCtrl.create({
          message: `Welcome ${this.userPrv.user.displayName}!`,
          position: 'bottom',
          duration: 3000
        });
        toast.present();
      })
      .catch(() => this.navCtrl.setRoot(LoginPage));
    }
  }

  connectRaspberry(device) {
    return this.blePrv.connect(device);
  }

  deviceSelected(device) {
    this.loaderPrv.startLoader('connecting...')
    .then(() => {
      this.connectRaspberry(device)
      .then(() => {
        this.loaderPrv.dismissLoader();
        this.navCtrl.push(MeasurementPage, { connection: 'bluetooth' });
      })
      .catch(() => {
        this.loaderPrv.dismissLoader();
      });
    });
  }

  disconnect() {
    this.blePrv.disconnect();
  }

  scanDevices() {
    this.showInfoScan = false;

    this.blePrv.bluetoothIsEnabled()
      .then(() => {
        this.blePrv.scan();
      })
      .catch(() => {
        this.blePrv.showBluetoothSettings();
      });
  }

  connectUsb() {
    this.loaderPrv.startLoader('connecting...')
    .then(() => {
      this.usbPrv.connect()
      .then(() => {
        this.loaderPrv.dismissLoader();
        this.navCtrl.push(MeasurementPage, { connection: 'usb' });
      })
      .catch((err) => {
        this.loaderPrv.dismissLoader();
        this.showUsbError(err);
      })
    });
  }

  showUsbError(error) {
    let toast = this.toastCtrl.create({
      message: error,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
