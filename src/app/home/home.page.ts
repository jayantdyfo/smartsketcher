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
  x1:number;
  x2:number;
  y1:number;
  y2:number;
  svg;
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
  data;
  // export default data;  

  ngOnInit() {
    // this.user.arraydata = JSON.parse(this.user.rapidPageValue);
    // this.showarray = this.user.rapidPageValue;
    var width = 1050;
    var height = 700;
    this.svg = d3.select("#container")
    .append("svg")
   .attr("width", width)
    .attr("height", height)
    .style('border',"1px solid black").
    style('margin','-7%');
  }






  selectProps(e){
    console.log(e)
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
      attr('width','100').
      attr('height','100').
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
}
