import * as moment from 'moment';
import { Injectable } from '@angular/core';
import { Credentials } from '../../interfaces/credentials';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Facebook } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { Platform } from 'ionic-angular';
import { webClientId } from '../../config/firebase';
import { LoaderProvider } from '../loader/loader';

@Injectable()
export class UserProvider {

  user: Credentials = {};
  userfirebaseLoaded: boolean = false;

  constructor(
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private loaderPrv: LoaderProvider) {

  }

  setUser(user) {
    this.user.displayName = user.displayName;
    this.user.email = user.email;
    this.user.photoURL = user.photoURL;
    this.user.uid = user.uid;
    this.user.provider = user.provider || this.getLoginProvider(user.photoURL);
    this.user.experiences = user.experiences ? this.parseDateExperiences(user.experiences) : [];
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile', 'user_friends'])
        .then(res => {
          const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);

          return this.loaderPrv.startLoader('logging in...')
            .then(() => {
              return firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
                .then((res) => {
                  this.setUser(res.user);
                        
                  return this.loaderPrv.dismissLoader();
                });
            });
        })
        .catch((err) => {
          console.log('error: ', err);
        });
    } else {
      return this.loaderPrv.startLoader('logging in...')
        .then(() => {
          return this.afAuth.auth
            .signInWithPopup(new firebase.auth.FacebookAuthProvider())
            .then((res) => {
              this.setUser(res.user);
              return this.loaderPrv.dismissLoader();
            });
        });
    }
  }

  signInWithGoogle() {
    if (this.platform.is('cordova')) {
      return this.googlePlus.login({
        webClientId,
        'offline': true
      })
        .then((res) => {
          return this.loaderPrv.startLoader('logging in...')
            .then(() => {
              return firebase.auth().signInAndRetrieveDataWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
                .then((res) => {
                  this.setUser(res.user);

                  return this.loaderPrv.dismissLoader();
                });
            });
        })
        .catch((err) => {
          return err;
        });
    }
  }

  logout() {
    return this.loaderPrv.startLoader('logging out...')
      .then(() => {
        return this.afAuth.auth.signOut()
          .then(() => {
            this.user = {};
            this.userfirebaseLoaded = false;

            return this.loaderPrv.dismissLoader();
          });
      });
  }

  private getLoginProvider(url: string) {
    return url.includes('facebook') ? 'facebook' :
      url.includes('google') ? 'google' :
        '';
  }

  private parseDateExperiences(eperiences: any[]) {
    return eperiences.map((experince) => {
     experince.date = moment(new Date(experince.date));
     
     return experince;
    });
  }
}
