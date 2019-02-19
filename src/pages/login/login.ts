import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = false;

  constructor(
    public navCtrl: NavController, 
    private userPrv: UserProvider,
    private toastCtrl: ToastController) {

  }

  signInWithFacebook() {
    this.userPrv.signInWithFacebook()
    .then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  signInWithGoogle() {
    this.userPrv.signInWithGoogle()
    .then((res) => {
      if (res === 12501) {
        const toast = this.toastCtrl.create({
          message: 'it is neccessary you allow google conditions to login the app',
          position: 'bottom',
          duration: 3000
        });
        toast.present();

      } else {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }
}
