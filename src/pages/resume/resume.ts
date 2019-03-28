import * as moment from 'moment';
import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { NavbarPopoverComponent } from '../../components/navbar-popover/navbar-popover';
import { LocationProvider } from '../../providers/location/location';
import { HomePage } from '../home/home';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoaderProvider } from '../../providers/loader/loader';
import { PopoverProvider } from '../../providers/popover/popover';
import { AlertProvider } from '../../providers/alert/alert';

import * as utils from '../../utils/utils';

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
    private firebasePrv: FirebaseProvider,
    private loaderPrv: LoaderProvider,
    private popoverPrv: PopoverProvider,
    private alertPrv: AlertProvider) {
    
    this.altitudes = this.navParams.get('altitudes');
    const lastTimeValue = this.altitudes[this.altitudes.length -1].x;
    const formattedTime = moment().startOf('day').seconds(lastTimeValue).format('HH:mm:ss');
    this.totalTimeText = `Total time: ${formattedTime}`;
    this.maxAltitude = utils.getMaxAltitude(this.altitudes);
    this.date = moment(new Date());

    // get geolocation
    this.locationPrv.initGeolocation()
      .then((resp) => {
        this.coords.lat = resp.coords.latitude;
        this.coords.lng = resp.coords.longitude;
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
    this.popoverPrv.openPopover(event, NavbarPopoverComponent, { items: this.items });
    this.popoverPrv.onWillDismissEvent()
    .then((action) => {
      if (action === 'save') {
        this.save();
      } else if (action === 'dismiss') {
        this.goToHome();
      }
    });
  }

  save() {
    const alertConfig = {
      title: 'Title',
      message: "Enter a name for the experience",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.experiencie = {
              title: data.title || 'untitled',
              altitudes: this.altitudes,
              totalTime: this.totalTimeText,
              date: this.date,
              altitudeValue: this.maxAltitude,
              coords: this.coords
            };
            
            this.loaderPrv.startLoader('saving experience...')
            .then(() => {
              this.firebasePrv.saveExperience(this.experiencie)
              .then(() => {
                this.loaderPrv.dismissLoader()
                .then(() => {
                  this.goToHome();
                });
              });  
            });    
          }
        }
      ]
    }
    
    this.alertPrv.openAlert(alertConfig);
  }

  goToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  dismiss() {
    this.goToHome();
  }
}
