import { Injectable } from '@angular/core';
import { PopoverController } from 'ionic-angular';

@Injectable()
export class PopoverProvider {

  popover: any;
  isOpen: boolean = false;

  constructor(
    private popoverCtrl: PopoverController) {
  }

  openPopover(event, component, componentParams) {
    this.popover = this.popoverCtrl.create(
      component, 
      componentParams
    );

    this.popover.present({
      ev: event
    })
    .then(() => this.isOpen = true);
  }

  dismissPopover() {
    this.popover.dismiss();
  }

  onWillDismissEvent() {
    return new Promise((resolve) => {
      this.popover.onWillDismiss((action) => {
        this.isOpen = false;
        resolve(action);
      });
    });
  }
}
