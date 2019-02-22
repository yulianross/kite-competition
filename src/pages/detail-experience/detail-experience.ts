import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NavbarPopoverComponent } from '../../components/navbar-popover/navbar-popover';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoaderProvider } from '../../providers/loader/loader';
import { PopoverProvider } from '../../providers/popover/popover';

@Component({
  selector: 'page-detail-experience',
  templateUrl: 'detail-experience.html',
})
export class DetailExperiencePage {

  /**
   * menuActive property
   * type: boolean
   * enable/disable the ion-menu
   */
  menuActive: boolean = false;

  experience: any;
  indexList: number;

  // popover items

  items: any[] = [{
      label: 'Delete',
      action: 'delete'
  }];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private firebasePrv: FirebaseProvider,
    private loaderPrv: LoaderProvider,
    private popoverPrv: PopoverProvider) {

      this.experience = navParams.get('experience');
      this.indexList = navParams.get('index');

  }

  openPopover(event: any) {
    const paramsPopover = {
      items: this.items,
        menuActive: this.menuActive 
    }
    this.popoverPrv.openPopover(event, NavbarPopoverComponent, paramsPopover);
    this.popoverPrv.onWillDismissEvent()
    .then((action) => {
      if(action === 'delete') {
        this.delete();
      }
    });
  }

  delete() {
    this.loaderPrv.startLoader('deleting experience...')
    .then(() => {
      this.firebasePrv.deleteExperience(this.indexList)
      .then(() => {
        this.loaderPrv.dismissLoader()
        .then(() => {
          this.navCtrl.pop();
        });
      });
    });
  }
}
