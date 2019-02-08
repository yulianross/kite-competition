import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
    private userPrv: UserProvider) {

  }

  signInWithFacebook() {
    this.userPrv.signInWithFacebook()
    .then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }

  signInWithGoogle() {
    this.userPrv.signInWithGoogle()
    .then(() => {
      this.navCtrl.setRoot(HomePage);
    });
  }
}
