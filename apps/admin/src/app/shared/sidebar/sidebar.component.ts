import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/users/src/lib/services/auth.service';

import { defineLordIconElement } from 'lord-icon-element';
import  lottie  from 'lottie-web';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor( private authService: AuthService) { 
    defineLordIconElement(lottie.loadAnimation);
  }

  ngOnInit(): void {
  }

  logoutUser(){
    this.authService.logout();
  }

}
