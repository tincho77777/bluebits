import { Component, OnInit } from '@angular/core';

import { defineLordIconElement } from 'lord-icon-element';
import  lottie  from 'lottie-web';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { 
    defineLordIconElement(lottie.loadAnimation);
  }

  ngOnInit(): void {
  }

}
