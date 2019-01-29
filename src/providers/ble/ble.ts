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
      message: 'Error scanning for Bluetooth low energy devices',
      position: 'middle',
      duration: 5000
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
        console.log('onConnected');
        resolve();
      }
      reject();
    });
  }

  onDeviceDisconnected(peripheral, reject) {

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
      this.ble.connect(device.id)
      .subscribe((peripheral) => {
        console.log('connected');
        this.resetProperties();
        this.onConnected(peripheral, resolve, reject)
      }, (peripheral) => {
        this.onDeviceDisconnected(peripheral, reject)
      });
    });   
  }

  disconnect() {
    return this.ble.isConnected(this.peripheral.id)
    .then((connected) => {
      //console.log('connected', connected);

      if (connected === 'OK') {
        this.ble.disconnect(this.peripheral.id).then(
          () => {
            console.log('Disconnected ');
            this.peripheral = {};

          }),
          () => console.log('ERROR disconnecting ' + JSON.stringify(this.peripheral))
      }
    })
    .catch((err) => {
      console.log('error al desconectarse', err);
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
    const data = new Int32Array(buffer);
    const now = moment();

    this.ngZone.run(() => {
      // registra el tiempo de la medida actual, en segundos
      let timeValue = Math.round(moment.duration(now.diff(this.firstTime)).asSeconds());

      this.currentAltitude = data[0];
      this.altitudeValues.push({ x: timeValue, y: data[0] }); 
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
          console.log('stopNotify');
        });
      }
    })
    .catch(() => {
      console.log('error al saber si está conectado');
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
