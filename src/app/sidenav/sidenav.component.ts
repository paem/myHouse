import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $:any;
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  constructor() { }

  // Jquery test
  title = 'hej';
  toggleTitle(){
    $('.title').slideToggle();
  }

  ngOnInit() {
    // using context
    $('.context.example .ui.sidebar')
    .sidebar({
      context: $('.context.example .bottom.segment')
    })
    .sidebar('attach events', '.context.example .menu .item')
    ;
  }

}
