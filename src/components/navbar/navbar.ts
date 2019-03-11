import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'navbar',
  templateUrl: 'navbar.html'
})
export class NavbarComponent {

  @Input('title') title : string;
  @Input('iconLabel') iconLabel : string;
  @Input('icon') icon : string;
  @Input('menu') menu : boolean;
  @Input('hideBackButton') hideBackButton : Boolean;

  @Output() private onClick = new EventEmitter<any>();

  constructor() { 
  }

  click(event) {
    this.onClick.next(event);
  }
}
