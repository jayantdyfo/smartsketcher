import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private user: UserService,
  ) {}
  iconname='square-outline'
  propbox = false;
  properties=['Room', 'Device', 'Decorations'];
  devices=[
    {img:'assets/img/bed_7.png'},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
    {img:''},
  ];
  decorations=[
    {img:'assets/img/bed_7.png'},
    {img:'assets/img/bed_single.png'},
    {img:'assets/img/sofa-1seat.png'},
    {img:'assets/img/sofa-2seat.png'},
    {img:'assets/img/table.png'},
    {img:'assets/img/television.png'},
    {img:'assets/img/dining-set.png'},
    {img:'assets/img/cooler.png'},
    // {img:'assets/img/bed_7.png'},
    // {img:'assets/img/bed_7.png'},
    // {img:'assets/img/bed_7.png'},
  ];
  props=this.properties[0]


  ngOnInit() {
    this.user.arraydata = JSON.parse(this.user.rapidPageValue);
    // this.showarray = this.user.rapidPageValue;
  }






  selectProps(e){
    console.log(e)
  }
  roomNo=0;
  select(ev, toolname){
    console.log(ev)
    let house = document.getElementById('container');
      house.style.cursor='crosshair';
    if(toolname=='rectangle'){
      house.addEventListener('click', e => {
        console.log(e);
        var el = document.createElement('div');
        el.style.border='2px solid';
        el.style.height='100px';
        el.style.width='100px';
        el.setAttribute('id','room'+this.roomNo);
        el.classList.add('room');
        house.appendChild(el);
      });
    }
    if(toolname=='polygon'){
     
    }
  }
}
