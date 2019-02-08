import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// plugins
import { BLE } from '@ionic-native/ble';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

// providers

import { BleProvider } from '../providers/ble/ble';
import { LocationProvider } from '../providers/location/location';
import { StorageProvider } from '../providers/storage/storage';
import { UserProvider } from '../providers/user/user';
import { LoaderProvider } from '../providers/loader/loader';
import { FirebaseProvider } from '../providers/firebase/firebase';

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
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';



// pipes
import { TruncateModule } from 'ng2-truncate';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from '../config/firebase';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ResumePage,
    MyExperiencesPage,
    MeasurementPage,
    DetailExperiencePage,
    LoginPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    TruncateModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ResumePage,
    MyExperiencesPage,
    MeasurementPage,
    DetailExperiencePage,
    LoginPage,
    UserPage,
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
    StorageProvider,
    UserProvider,
    Facebook,
    GooglePlus,
    LoaderProvider,
    FirebaseProvider
  ]
})
export class AppModule {}
