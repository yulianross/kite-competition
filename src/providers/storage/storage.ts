import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';


@Injectable()
export class StorageProvider {
  
  constructor(
    private storage: Storage,
    private platform: Platform) {
  }

  getStorage(name) {
    if(this.platform.is('cordova')) {
      return this.storage.ready()
      .then(() => {
        return this.storage.get(name);
      })
    } else {
      if(localStorage.getItem(name)) {
        return new Promise((resolve, reject) => {
          resolve(JSON.parse(localStorage.getItem(name)));
        });
      } else {
        return new Promise((resolve) => {
          resolve(null);
        })
      }
    }
  }

  saveStorage(name: string, value: any) {
    if(this.platform.is('cordova')) {
      return this.storage.ready()
      .then(() => {
        return this.storage.set(name, value);
      });
    } else {
      return new Promise((resolve, reject) => {
        localStorage.setItem(name, JSON.stringify(value));
        resolve();
      }); 
    }
  }
}
