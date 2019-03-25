import { Injectable, NgZone } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';

@Injectable()
export class BleProvider {

  devices: any[] = [];
  peripheral: any = {};
  notifyCharacteristic: any = {};
  currentAltitude: any = 0;
  altitudeValues: any[] = [];
  firstTime: any;
  connectObservable: any;
  selectedDevice: any;

  raspberryDevice: any = {
    name: 'Counter',
    id: 'B8:27:EB:BC:70:ED',
    characteristic: {
      id: "11111110-9fab-43c8-9231-40f6e305f96d"
    }
  };
   
  constructor(
    private ble: BLE,
    private toastCtrl: ToastController,
    private ngZone: NgZone) {

  }

  bluetoothIsEnabled() {
    return this.ble.isEnabled();
  }

  showBluetoothSettings() {
    return this.ble.showBluetoothSettings()
  }

  scan() {
    this.devices = [];  // clear list

    this.ble.scan([], 5).subscribe(
      device => this.onDeviceDiscovered(device), 
      error => this.scanError(error)
    );
  }

  onDeviceDiscovered(device) {
    this.ngZone.run(() => {
      this.devices.push(device);
    });
  }

   // If location permission is denied, you'll end up here
   scanError(error) {
    let toast = this.toastCtrl.create({
      message: error,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }

  onConnected(peripheral, resolve, reject) {
    this.ngZone.run(() => {
      this.peripheral = peripheral;
      this.notifyCharacteristic = peripheral.characteristics.filter((characteristic) => {
        return characteristic.characteristic === this.raspberryDevice.characteristic.id;
      })[0];

      if (this.notifyCharacteristic) {
        this.ble.startNotification(peripheral.id, this.notifyCharacteristic.service, this.notifyCharacteristic.characteristic)
        .subscribe(
          (value) => {
            this.onAltitudValue(value);
          } ,
          (err) => {
            this.onNotifiedError(err);
          }
        );

        this.firstTime = moment();
        return resolve();
      } else {
        return reject();
      }
    });
  }

  onDeviceDisconnected(reject) {

    let toast = this.toastCtrl.create({
      message: 'Asure you are connecting to your peripheral',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    reject();
  }

  connect(device) {
    return new Promise((resolve, reject) => {
      this.connectObservable = this.ble.connect(device.id)
      .subscribe((peripheral) => {
        this.resetProperties();
        this.onConnected(peripheral, resolve, reject)
      }, (err) => {
        this.onDeviceDisconnected(reject)
      });
    });   
  }

  disconnect() {
    return this.ble.isConnected(this.peripheral.id)
    .then((connected) => {
      if (connected === 'OK') {
        this.ble.disconnect(this.peripheral.id)
        .then(() => {
            this.peripheral = {};
            this.connectObservable.unsubscribe();
          });
      }
    });
  }

  /**
   * onAltitudValue
   * save the data received by characteristic in currentAltitude and altitudeValues ptoperties
   * and registry the measures times
   * @param buffer: ArrayBuffer
   * @return void:
   */

   
  onAltitudValue(buffer:ArrayBuffer) {
    this.ngZone.run(() => {
      const data = new Int32Array(buffer);
      const now = moment();
      // registra el tiempo de la medida actual, en segundos
      let timeValue = Math.round(moment.duration(now.diff(this.firstTime)).asSeconds());

      // para valores negativos, se asigna el valor 0
      this.currentAltitude = data[0] >= 0 ? data[0]: 0;

      this.altitudeValues.push({ x: timeValue, y: this.currentAltitude }); 
    });
  }

  onNotifiedError(err) {
    console.log('errror al ser notificado', err);
  }

  stopNotify() {
    return this.ble.isConnected(this.peripheral.id)
    .then((connected) => {
      if (connected === 'OK') {
        this.ble.stopNotification(this.peripheral.id, this.notifyCharacteristic.service, this.notifyCharacteristic.characteristic)
        .then(() => {
          this.notifyCharacteristic = {};
        });
      }
    }); 
  }

  disconnectDevice() {
    return new Promise((resolve, reject) => {
      this.stopNotify()
      .then(() => {
        this.disconnect()
        .then(() => {
          resolve();
        })
      })
    }) 
  }

  resetProperties() {
    this.currentAltitude = 0;
    this.altitudeValues = [];
    this.firstTime = {};
  }

}
