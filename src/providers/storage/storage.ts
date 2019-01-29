import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform, LoadingController } from 'ionic-angular';


@Injectable()
export class StorageProvider {

  experiences: any[] = []; 

  constructor(
    private storage: Storage,
    private platform: Platform,
    private loadingCtrl: LoadingController) {

    console.log('Hello StorageProvider Provider');
  }

  loadStorage() {

    return new Promise((resolve, reject) => {
      if (this.platform.is('cordova')) {
        // device
        this.storage.ready()
        .then(() => {
          this.storage.get('experiences')
          .then((experiences) => {
            this.experiences = experiences || [];
            resolve();
          });  
        });
      } else {
        // browser
        if (localStorage.getItem('experiences')) {
          this.experiences = JSON.parse(localStorage.getItem('experiences'));
        }
        resolve(); 
      }
    });
  }

  saveStorage() {
    const loader = this.loadingCtrl.create({
      content: 'saving data...'
    });

    return new Promise((resolve, reject) => {
      loader.present()
        .then(() => {
          if (this.platform.is('cordova')) {
            // device
            this.storage.ready()
            .then(() => {
              this.storage.set('experiences', this.experiences)
              .then(() => {
                loader.dismiss();
                resolve();
              });
            });
          } else {
            // browser
            localStorage.setItem('experiences', JSON.stringify(this.experiences));
            loader.dismiss();
            resolve();
          }
        });
    });
  }

  addExperience(experience) {
    this.experiences.push(experience);

    return this.saveStorage();
  }

  deleteExperience(index) {
    this.experiences.splice(index, 1);

    return this.saveStorage();
  }
}
