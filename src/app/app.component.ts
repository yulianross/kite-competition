import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { FirebaseProvider } from '../providers/firebase/firebase';
import { PopoverProvider } from '../providers/popover/popover';

import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  menuActive:boolean = true;
  
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    app: App,
    menuCtrl: MenuController,
    userPrv: UserProvider,
    storage: Storage,
    firebasePrv: FirebaseProvider,
    popoverPrv: PopoverProvider) {
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      storage.ready().then(() => {
        statusBar.styleDefault();
      });
    
      let nav = app.getActiveNavs()[0];

      
        firebasePrv.checkUserLogged()
        .then((user) => {
          if(user) {
            userPrv.setUser(user);
            nav.setRoot(HomePage);
          } else {
            nav.setRoot(LoginPage);
          }
          splashScreen.hide();
        });
      
      if(platform.is('android')) {
        platform.registerBackButtonAction(() => {
          // Catches the active view
          let activeView = nav.getActive();

          if (menuCtrl.isOpen()) {
            return menuCtrl.close();
          }

          if (popoverPrv.isOpen) {
            return popoverPrv.dismissPopover();
          }

          if(typeof activeView.instance.backButtonAction === 'function') {
            activeView.instance.backButtonAction();
          } else if(activeView.component === HomePage || activeView.component === LoginPage) {
            platform.exitApp();
          } else {
            nav.pop();
          }
        });
      }
    });

    app.viewDidEnter.subscribe((view) => {
      this.menuActive = view.instance.menuActive === false ? false: true;
    });
  }
}

