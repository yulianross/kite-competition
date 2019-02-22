import { Component, Input, OnChanges } from '@angular/core';

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
export class DisplayComponent implements OnChanges {

  @Input('title') title : string;
  @Input('value') value : number;
  @Input('unit') unit : string;
  @Input('rangeBlink') rangeBlink : number;

  blink:boolean = false;
  maxValue: number = 0;

  constructor() {
    console.log('Hello DisplayComponent Component');
  }

  ngOnChanges() {
    if(this.rangeBlink) {
      let rest = this.value % this.rangeBlink;

      if(rest === 0 && this.value > this.maxValue) {
        this.blink = true;
        this.maxValue = this.value;
        setTimeout(() => {
          this.blink = false;
        }, 5000);
      } 
    } 
  }
}
