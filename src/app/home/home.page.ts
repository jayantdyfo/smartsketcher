import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import * as d3 from 'd3';

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
  x;
  y;
  image;
  x1:number;
  x2:number;
  y1:number;
  y2:number;
  svg;
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
    var width = 1050;
    var height = 650;
    this.svg = d3.select("#layout")
    .append("svg")
   .attr("width", width)
    .attr("height", height)
    .style('border',"1px solid black").
    style('margin','-7%');
  //this.svg=document.querySelector('svg');
  }






  selectProps(e){
    //console.log(e)
  }
  roomNo=0;
  select(ev, toolname){
    var self=this;
    console.log(ev)
    let house = document.getElementById('container');
      house.style.cursor='crosshair';
    if(toolname=='rectangle'){
      self=this;
      $(function() {
        $("svg").mousedown(function(e) {
        
          var offset = $(this).offset();
          
        self.x = (e.pageX - offset.left);
        self.y = (e.pageY - offset.top);
        });
        });
        
      this.svg.append("rect").
      attr('x',self.x).
      attr('y',self.y).
      attr('width','200').
      attr('height','200').
      attr('stroke','black').
      attr('stroke-width','3').
      attr('fill','none')
      
    }
    if(toolname=='polygon'){
    
    $(function() {
      $("svg").mousedown(function(e) {
      
        var offset = $(this).offset(); 
      self.x1 = (e.pageX - offset.left);
      self.y1 = (e.pageY - offset.top);
      });
      });
      $(function() {
        $("svg").mouseup(function(e) {
        
          var offset = $(this).offset();
          self.x2 = (e.pageX - offset.left);
          self.y2 = (e.pageY - offset.top);
         });
        });
  // alert("x1"+self.x1+"y1"+self.y2+"x2"+self.x2+"y2"+self.y2);
    this.svg.append("line")
       .attr("x1", self.x1)
       .attr("x2", self.x2)
       .attr("y1", self.y1)
       .attr("y2", self.y2)
       .attr("stroke", "black")
       .attr('stroke-width','3')
     }
 }
  allowDrop(ev) {
  ev.preventDefault();
}

 drag(ev,path) {
 //localStorage.setItem('data',ev.currentTarget);
 let element=ev.currentTarget;
 this.image=path;
 element.classList.add("mystyle");
console.log(element)
 //alert(data)
//  alert(ev.currentTarget)
//  console.log(ev.currentTarget)

}

drop(ev) {
 // ev.preventDefault();
  console.log(ev.target)
let self=this;
  //var data = localStorage.getData("data");
  var data=document.querySelectorAll('.mystyle');
  let target=document.querySelector('svg');
  $(function() {
    $("svg").mousedown(function(e) {
    
      var offset = $(this).offset();
    self.x = (e.pageX - offset.left);
    self.y= (e.pageY - offset.top);
     });
    });
 //alert(data)
 this.svg.append('image')
       .attr("href",this.image)
      .attr("x", self.x)
      .attr("y", self.y)
       .attr("width", "6%")
       .attr("height", "6%")
      //  .attr('stroke-width','3')
     }
//  for(let i=0;i<data.length;i++){
//   // this.svg.appendChild(data[i]);
//   ev.currentTarget.appendChild(data[i]);
//  }
//}
}
