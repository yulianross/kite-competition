import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
/**
 * Generated class for the NavbarPopoverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'navbar-popover',
  templateUrl: 'navbar-popover.html'
})
export class NavbarPopoverComponent {

  items: object[] = [];

  text: string;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController) {

    this.items = this.navParams.get('items');
  }

  click(action) {
    this.viewCtrl.dismiss(action);
  }
}
