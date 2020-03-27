import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private user: UserService,
  ) {}
  
  viewDetails = ViewLayoutComponent;
  iconname='square-outline'
  propbox = false;
  properties=['Room', 'Device', 'Decorations'];
  devices=[
    {img:'assets/img/3d-wall-lamp.png'},
    {img:'assets/img/3pin-switch-down.png'},
    {img:'assets/img/3pin-switch-left.png'},
    {img:'assets/img/3pin-switch-right.png'},
    {img:'assets/img/3pin-switch-up.png'},
    {img:'assets/img/airconditioner.png'},
    {img:'assets/img/bulb.png'},
    {img:'assets/img/chandelier.png'},
    {img:'assets/img/curtain-on.png'},
    {img:'assets/img/fan-on.png'},
    {img:'assets/img/geyser-on.png'},
    {img:'assets/img/light-bulb-on.png'},
    {img:'assets/img/lock.png'},
    {img:'assets/img/microwave-oven.png'},
    {img:'assets/img/refrigerator-on.png'},
    {img:'assets/img/rotor-on.png'},
    {img:'assets/img/security_cam.png'},
    {img:'assets/img/socket-on.png'},
    {img:'assets/img/television-on.png'},
    {img:'assets/img/tubelight-on.png'},
    {img:'assets/img/wall-lamp-on.png'},
    {img:'assets/img/washing_machine-on.png'},
    {img:'assets/img/water-pump-on.png'},
    {img:'assets/img/water-purifier-on.png'},
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
  floor=[
    {img:'assets/img/floor.png'},
    {img:'assets/img/marble.jpg'},
    {img:'assets/img/tiles1.png'},
    {img:'assets/img/tiles2.png'},
    {img:'assets/img/tiles3.png'},
    {img:'assets/img/tiles4.png'},
    {img:'assets/img/tiles5.png'},
    {img:'assets/img/tiles6.png'},
    {img:'assets/img/tiles7.png'},
    {img:'assets/img/tiles8.png'},
    {img:'assets/img/tiles9.png'},
    {img:'assets/img/tiles10.png'},
    {img:'assets/img/tiles11.png'},
    {img:'assets/img/tiles12.png'},
    {img:'assets/img/tiles13.png'},
    {img:'assets/img/tiles14.png'},
    {img:'assets/img/tiles15.png'},
    {img:'assets/img/tiles16.png'},
  ];
  props=this.properties[0]
  data;
  // export default data;  

  ngOnInit() {
    // this.user.arraydata = JSON.parse(this.user.rapidPageValue);
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
        // var el = document.createElement('div');
        // el.style.border='2px solid';
        // el.style.height='100px';
        // el.style.width='100px';
        // el.setAttribute('id','room'+this.roomNo);
        // el.classList.add('room');
        // house.appendChild(el);
        let rooms: RoomData[] = [];
        rooms.push(
          {
            type: 'balcony',
            label: {
              name: 'Balcony'
            },
            coordinates: {
              type: 'rect',
              origin: {
                x: 3,
                y: 5
              },
              w: 25,
              h: 8
            },
            roomId: 10,
            active: true,
            floor: 'wooden',
            devices: [{
              type: 'chandelier',
              x: 50,
              y: 50,
              rotate: 0,
              deviceId: 1,
              scale: 0.5
            }    
           ],
           decorations:[
           
            
            {
              type: 'sofa_2seat',
              x: 30,
              y: 17,
              rotate: 0,
              scale: 0.7
            } ,
            {
              type: 'sofa_1seat',
              x: 48,
              y: 18,
              rotate: 0,
              scale: 0.56
            }
         
            
            
          ]
           
        });
        let doors = [];
        doors.push(
          {
            origin: {
              x: 4,
              y: 5
            },
            length: 12,
            
            orientation:0
          });
          let entrance = {
            x: 7,
            y: 5,
            length: 13,
            orientation:90
          };
      this.data={
        rooms: rooms,
        doors: doors,
        entrance: entrance
      }
      this.user.arraydata = this.data;
      this.user.onHomeSelect();

      });
    }
    if(toolname=='polygon'){
     
    }
  }
}
