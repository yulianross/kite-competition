import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {

  constructor(
    private geolocation: Geolocation) {
  }

  initGeolocation() {
    return this.geolocation.getCurrentPosition();
  }
}
