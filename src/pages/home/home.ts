import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController, LoadingController } from 'ionic-angular';
import { BleProvider } from '../../providers/ble/ble';
import { MeasurementPage } from '../measurement/measurement';
import { UserProvider } from '../../providers/user/user';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import * as moment from 'moment';

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

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private blePrv: BleProvider,
    private loadingCtrl: LoadingController,
    private userPrv: UserProvider,
    private firebasePrv: FirebaseProvider) {
      console.log('home page');
      
  }

  ngOnInit() {
    if (!this.userPrv.userfirebaseLoaded) {
      console.log('cargando usuario de firebase');
      this.firebasePrv.loadUser()
      .then(() => {
        const toast = this.toastCtrl.create({
          message: `Welcome ${this.userPrv.user.displayName}!`,
          position: 'bottom',
          duration: 3000
        });
        toast.present();
      });
    } 
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

  initCounter() {
    this.currentAltitude += 1;
  }
}
