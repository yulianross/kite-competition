import { Component } from '@angular/core';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { LoaderProvider } from '../../providers/loader/loader';


@Component({
  selector: 'page-global-ranking',
  templateUrl: 'global-ranking.html',
})
export class GlobalRankingPage  {

  bestExperiences: any[];


  constructor(
    private firebasePrv: FirebaseProvider,
    private loaderPrv: LoaderProvider) {

    this.firebasePrv.getAllUsers()
      .valueChanges()
      .subscribe((users) => {
        this.bestExperiences = this.getExperiences(users);
        console.log('constructor');
      });
  }

  getExperiences(users: any[]) {
    const experiences = [];

    users.forEach((user) => {
      user.experiences.forEach(experience => {
        experiences.push({
          nameUser: user.displayName, 
          altitude: experience.altitudeValue
        });
      });
    });

    return experiences.sort((a, b) => b.altitude - a.altitude);
  }

}
