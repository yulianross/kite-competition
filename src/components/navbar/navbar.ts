import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent implements OnInit {

  @Input('title') title : string;
  @Input('iconLabel') iconLabel : string;
  @Input('icon') icon : string;
  @Input('menu') menu : boolean;
  @Input('hideBackButton') hideBackButton : Boolean;

  @Output() private onClick = new EventEmitter<any>();

  constructor(
    private menuCtrl: MenuController) {
    
    console.log('Hello NavbarComponent Component');
  }

  ngOnInit() {
    console.log("ngOnInit");
    // if (this.menu) {
    //   this.menuCtrl.enable(true, 'main-menu');
    // } else {
    //   this.menuCtrl.enable(false, 'main-menu');
    // }
  }

  click(event) {
    this.onClick.next(event);
  }
}
