import * as moment from 'moment';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { NavbarPopoverComponent } from '../../components/navbar-popover/navbar-popover';
import { LocationProvider } from '../../providers/location/location';
import { BleProvider } from '../../providers/ble/ble';
import { StorageProvider } from '../../providers/storage/storage';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-resume',
  templateUrl: 'resume.html',
})
export class ResumePage {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = false;

  // graphic variables
  altitudes: any[];
  maxAltitude: any;
  totalTimeText: string;
  date: any;

  // display max altitude
  altitudeValue: Number;

  // google maps coords
  coords = {
    lat: 0,
    lng: 0
  };

  // popover items
  items: any[] = [{
    label: 'save',
    action: 'save'
  }, {
    label: 'dismiss',
    action: 'dismiss'
  }];

  // data for saving
  experiencie: any;
  titleExperience: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private locationPrv: LocationProvider,
    private blePvr: BleProvider,
    private storagePrv: StorageProvider,
    private alertCtrl: AlertController) {
      
    this.altitudes = this.blePvr.altitudeValues;
    const lastTimeValue = this.blePvr.altitudeValues[this.blePvr.altitudeValues.length -1].x;
    const formattedTime = moment().startOf('day').seconds(lastTimeValue).format('HH:mm:ss');
    this.totalTimeText = `Total time: ${formattedTime}`;
    this.maxAltitude = this.getMaxAltitude(this.altitudes);
    this.date = moment(new Date());

    // get geolocation
    this.locationPrv.initGeolocation()
      .then((resp) => {
        this.coords.lat = resp.coords.latitude;
        this.coords.lng = resp.coords.longitude;
        console.log(resp);
      })
      .catch((err) => {
        console.log('error locaion: ', err);
      });
  }

  /**
   * backButtonAction event
   * it executes when the android hardware button is pressed. The event is registrated 
   * in app.component.ts
   * @return void
   */
  backButtonAction() {
    this.goToHome();
  }

  openPopover(event: any) {
    const popover = this.popoverCtrl.create(
      NavbarPopoverComponent,
      { items: this.items });

    popover.present({
      ev: event
    });

    popover.onWillDismiss((action) => {
      if (action === 'save') {
        this.save();
      } else if (action === 'dismiss') {
        this.dismiss();
      }
    });
  }

  save() {
    // const prompt = this.alertCtrl.create({
    //   title: 'Title',
    //   message: "Enter a name for the experience",
    //   inputs: [
    //     {
    //       name: 'title',
    //       placeholder: 'Title'
    //     },
    //   ],
    //   buttons: [
    //     {
    //       text: 'Cancel',
    //       handler: data => {
    //         console.log('Cancel clicked');
    //       }
    //     },
    //     {
    //       text: 'Save',
    //       handler: data => {
    //         this.experiencie = {
    //           title: data.title || 'untitled',
    //           altitudes: this.altitudes,
    //           totalTime: this.totalTimeText,
    //           date: this.date,
    //           altitudeValue: this.maxAltitude,
    //           coords: this.coords
    //         };
    //         this.storagePrv.addExperience(this.experiencie)
    //         .then(() => {
    //           // quitar ruleta de carga
    //           this.goToHome();
    //         });    
    //       }
    //     }
    //   ]
    // });

    // prompt.present();
  }

  dismiss() {
    this.goToHome();
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  getMaxAltitude(data) {

    const altitudes = data.map((altitude) => {
      return altitude.y;
    });

    return Math.max.apply(null, altitudes);
  }
}
