import { Component, Input } from '@angular/core';
import { MyExperiencesPage } from '../../pages/my-experiences/my-experiences';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { UserPage } from '../../pages/user/user';
import { UserProvider } from '../../providers/user/user';
import { LoginPage } from '../../pages/login/login';
@Component({
  selector: 'menu',
  templateUrl: 'menu.html'
})
export class MenuComponent {
  @Input('content') content: any;
  @Input('active') active: boolean;

  private objectPage: any = {
    MyExperiencesPage,
    HomePage,
    UserPage
  }

  constructor(
    public menuCtrl: MenuController,
    private userPrv: UserProvider) {
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

  logout() {
    this.userPrv.logout()
    .then(() => {
      this.content.setRoot(LoginPage);
    });
  }
}
