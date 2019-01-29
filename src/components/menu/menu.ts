import { Component, Input } from '@angular/core';
import { MyExperiencesPage } from '../../pages/my-experiences/my-experiences';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  @Input('content') content: any;
  @Input('active') active: boolean;

  private objectPage: any = {
    MyExperiencesPage,
    HomePage
  }

  constructor(
    public menuCtrl: MenuController) {
  }

  goTo(pageName: string) {
    if (this.content.getActive().name !== pageName) {
      if (pageName === 'HomePage') {
        this.content.setRoot(HomePage);  
      } else {
        this.content.push(this.objectPage[pageName]);  
      } 
    }

    this.menuCtrl.close();
  }
}
