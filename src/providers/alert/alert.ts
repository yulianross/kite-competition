import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';


@Injectable()
export class AlertProvider {

  private alert: any = null;
  public isOpen: boolean = false;

  constructor(
    private alertCtrl: AlertController) {
  }

  openAlert(elements) {
    this.alert = this.alertCtrl.create(elements);
    
    this.alert.present()
    .then(() => this.isOpen = true);

    this.alert.onWillDismiss(() => {
      this.isOpen = false;
      this.alert = null;
    });
  }

  dismissAlert() {
    this.alert.dismiss();
  }
}
