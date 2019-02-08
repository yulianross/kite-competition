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

  constructor(
    private fb: Facebook,
    private googlePlus: GooglePlus,
    private afAuth: AngularFireAuth,
    private platform: Platform,
    private loaderPrv: LoaderProvider) {

  }

  loadUser(user) {
    this.user.name = user.displayName;
    this.user.mail = user.email; 
    this.user.img = user.photoURL; 
    this.user.uid = user.uid; 
    this.user.provider = this.getLoginProvider(user.photoURL);
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile'])
      .then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        
        return this.loaderPrv.startLoader('logging in...')
        .then(() => {
         return  firebase.auth().signInAndRetrieveDataWithCredential(facebookCredential)
          .then((res) => {
            this.loadUser(res.user);

            return this.loaderPrv.dismissLoader();
          });
        }); 
      });
    } else {
      return this.loaderPrv.startLoader('logging in...').then(() => {
        return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then((res) => {
          this.loadUser(res.user);

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
            this.loadUser(res.user);

            return this.loaderPrv.dismissLoader();
          });
        });
      }) 
      .catch((err) => {
        console.error('error: ', err);
      });
    } 
  }

  logout() {
    return this.loaderPrv.startLoader('logging in...')
    .then(() => {
      return this.afAuth.auth.signOut()
      .then(() => {
        this.user = {};
        
        return this.loaderPrv.dismissLoader();
      });
    });  
  }

  getLoginProvider(url: string) {
    return url.includes('facebook') ? 'facebook':
           url.includes('google') ? 'google': 
           '';
  }
}
