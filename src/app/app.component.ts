import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoaderProvider } from '../providers/loader/loader';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserProvider } from '../providers/user/user';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  menuActive: boolean = true;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    app: App,
    loaderPrv: LoaderProvider,
    menuCtrl: MenuController,
    storage: Storage,
    afAuth: AngularFireAuth,
    userPrv: UserProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      let nav = app.getActiveNavs()[0];
      let startingApp = true;

      storage.ready()
        .then(() => {
          statusBar.styleDefault();
          splashScreen.hide();
        });

      if (platform.is('android')) {
        platform.registerBackButtonAction(() => {
          // Catches the active view
          let activeView = nav.getActive();

          if (menuCtrl.isOpen()) {
            return menuCtrl.close();
          }
          if (typeof activeView.instance.backButtonAction === 'function') {
            activeView.instance.backButtonAction();
          } else if (activeView.name === "HomePage" || activeView.name === "LoginPage") {
            platform.exitApp();
          } else {
            nav.pop();
          }
        });
      }

      loaderPrv.startLoader('checking login...')
        .then(() => {
          afAuth.authState.subscribe((user) => {
            if (user && startingApp) {
              userPrv.loadUser(user);
              nav.setRoot(HomePage);
            } else {
              nav.setRoot(LoginPage);
            }
            if (startingApp) {
              loaderPrv.dismissLoader();
              startingApp = false;
            }
          });
        });

      app.viewDidEnter.subscribe((view) => {
        this.menuActive = view.instance.menuActive === false ? false : true;
      });
    });
  }
}
