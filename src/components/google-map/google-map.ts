import { Component, Input } from '@angular/core';

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  @Input('lat') lat : Number;
  @Input('lng') lng : Number;

  constructor() {
    console.log('Hello GoogleMapComponent Component');
  }
}
