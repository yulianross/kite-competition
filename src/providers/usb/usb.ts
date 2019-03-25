import { Injectable, NgZone } from '@angular/core';
import { Serial } from '@ionic-native/serial';
import * as moment from 'moment';

@Injectable()
export class UsbProvider {

  readCallback: any;
  currentAltitude: any = 0;
  altitudeValues: any[] = [];
  firstTime: any;

  constructor(
    private serial: Serial,
    private ngZone: NgZone) {

    console.log('Hello UsbProvider Provider');
  }

  connect() {
    return this.serial.requestPermission()
    .then(() => {
      return this.serial.open({
        baudRate: 9600,
        dataBits: 4,
        stopBits: 1,
        parity: 0,
        dtr: true,
        rts: true,
        sleepOnPause: false
      })
      .then(() => {
        this.resetProperties();
        this.firstTime = moment();
        this.readCallback = this.register();
      });
    })
  }

  register() {
    return this.serial.registerReadCallback()
    .subscribe((buffer) => {
      this.ngZone.run(() => {
        let data = new Int8Array(buffer);
        console.log(data);
        if (data.length === 2) {
          this.currentAltitude = ((data[0] * 128) + data[1]) > 0 ? ((data[0] * 128) + data[1]) : 0;
          const now = moment();
          let timeValue = Math.round(moment.duration(now.diff(this.firstTime)).asSeconds());
          this.altitudeValues.push({ x: timeValue, y: this.currentAltitude });            
        }
      });
    });
  }

  disconnect() {
    this.readCallback.unsubscribe();
    
    return this.serial.close();
  }

  resetProperties() {
    this.currentAltitude = 0;
    this.altitudeValues = [];
    this.firstTime = {};
  }

}
