import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

  constructor(
    private geolocation: Geolocation
  ) {
    console.log('Hello LocationProvider Provider');
  }

  initGeolocation() {
    return this.geolocation.getCurrentPosition();
  }
}
