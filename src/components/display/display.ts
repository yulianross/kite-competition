import { Component, Input } from '@angular/core';

/**
 * Generated class for the DisplayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'display',
  templateUrl: 'display.html'
})
export class DisplayComponent {

  @Input('title') title : string;
  @Input('value') value : number;
  @Input('unit') unit : string;

  constructor() {
    console.log('Hello DisplayComponent Component');
  }

}
