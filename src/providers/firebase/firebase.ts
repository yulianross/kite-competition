import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserProvider } from '../user/user';
import { LoaderProvider } from '../loader/loader';
import firebase from 'firebase/app';
@Injectable()
export class FirebaseProvider {

  constructor(
    private afDB: AngularFirestore,
    private userPrv: UserProvider) {
  }

  checkUserLogged() {
    return new Promise((resolve, reject) => {
      const unsubscribeAuth = firebase
      .auth()
      .onAuthStateChanged((user) => {
        unsubscribeAuth();
        resolve(user);
      });  
    });
  }

  loadUser() {
    return this.afDB.doc(`users/${ this.userPrv.user.uid }`)
      .get()
      .toPromise()
      .then((user) => {
        if (user.exists) {
          this.userPrv.userfirebaseLoaded = true;
          return this.userPrv.setUser(user.data());
         
        } else {
          this.userPrv.userfirebaseLoaded = true;
          return this.setUser();
        }  
    });
  }

  setUser() {
    return this.afDB.collection('users').doc(this.userPrv.user.uid).set(this.userPrv.user);
  }

  getAllUsers() {

    return this.afDB.collection('users');
  }

  saveExperience(experience: any) {
    const experiences = [...this.userPrv.user.experiences];

    experiences.push(experience);

    return this.updateExperiences(experiences)
    .then(() => {
      this.userPrv.user.experiences.push(experience);
    });
  }

  deleteExperience(index) {
    const experiences = [...this.userPrv.user.experiences];

    experiences.splice(index, 1);
    
    return this.updateExperiences(experiences)
    .then(() => {
      this.userPrv.user.experiences.splice(index, 1);
    });
  }

  private stringifyDateExperiences(experiences) {
    return experiences.map((exp) => {
      return (exp.date = exp.date.toString(), exp);
    });
  }

  private updateExperiences(experiences) {
    return this.afDB.doc(`users/${ this.userPrv.user.uid }`).update({
      experiences: this.stringifyDateExperiences(experiences)
    })
  }
}
