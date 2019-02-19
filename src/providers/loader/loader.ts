
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoaderProvider {

  loader: any;

  constructor(
    private loadingCtrl: LoadingController) {
      console.log('loader');
  }

  startLoader(label: string) {
    this.loader = this.loadingCtrl.create({
      content: label
    });

    return this.loader.present();
  }

  dismissLoader() {
    return this.loader.dismiss();
  }
}
