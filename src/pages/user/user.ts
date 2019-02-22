import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Credentials } from '../../interfaces/credentials';
import { UserProvider } from '../../providers/user/user';
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  user: Credentials = {};
  spinner: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userPrv: UserProvider) {

      this.user = this.userPrv.user;

  }

  onImageLoad(event) {
    console.log(event);
  }
}
