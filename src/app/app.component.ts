import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { StorageProvider } from '../providers/storage/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;
  menuActive:boolean = true;
  
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    app: App,
    storagePrv: StorageProvider) {
      
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      storagePrv.loadStorage()
      .then(() => {
        statusBar.styleDefault();
        splashScreen.hide(); 
      });

      if(platform.is('android')) {
        platform.registerBackButtonAction(() => {
          // Catches the active view
          let nav = app.getActiveNavs()[0];
          let activeView = nav.getActive();
          
          if(typeof activeView.instance.backButtonAction === 'function') {
            activeView.instance.backButtonAction();
          } else if(activeView.name === "HomePage"){
            platform.exitApp();
          } else {
            nav.pop();
          }
        });
      }
    });

    app.viewDidEnter.subscribe((view) => {
      this.menuActive = view.instance.menuActive || false;
    });
  }
}

