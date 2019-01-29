import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// plugins
import { BLE } from '@ionic-native/ble';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';

// providers

import { BleProvider } from '../providers/ble/ble';
import { LocationProvider } from '../providers/location/location';
import { StorageProvider } from '../providers/storage/storage';

// components
import { ComponentsModule } from '../components/components.module';
import { NavbarPopoverComponent } from '../components/navbar-popover/navbar-popover';

// pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ResumePage } from '../pages/resume/resume';
import { MyExperiencesPage } from '../pages/my-experiences/my-experiences';
import { MeasurementPage } from '../pages/measurement/measurement';
import { DetailExperiencePage } from '../pages/detail-experience/detail-experience';

// pipes
import { TruncateModule } from 'ng2-truncate';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResumePage,
    MyExperiencesPage,
    MeasurementPage,
    DetailExperiencePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    TruncateModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResumePage,
    MyExperiencesPage,
    MeasurementPage,
    DetailExperiencePage,
    NavbarPopoverComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BLE,
    BleProvider,
    Geolocation,
    LocationProvider,
    StorageProvider
  ]
})
export class AppModule {}
