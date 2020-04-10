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
    {img:'assets/img/tiles2.jpg'},
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
    // var width = 1050;
    // var height = '100%';
  //   this.svg = d3.select("#container")
  //   .append("svg")
  //  .attr("width", width)
  //   .attr("height", height)
  //   .style('border',"1px solid black").
  //   style('margin','-7%')
  //   // .attr('onclick','makeDraggable(evt)')
  //   ;
  }
  ionViewWillEnter() {
    // if(!(document.querySelector('rect') == null)){
    //   console.log( d3.select('rect'))
    //  }
  }
  selectProps(e){
    console.log(e)
  }


  roomNo=0;
  selectedElement;
  offset
  toolname='none';
  select(ev, tool){
    window['d3'] = d3;
    var self=this;
    self.toolname=tool;
    console.log(ev)
      let house = document.getElementById('house');
      let selector = d3.select("#house");
        house.style.cursor='crosshair';
        if(self.toolname=='rectangle'){
          self=this;
            self.getPointerOnSVG();
            selector.on('click', (e)=>{ 
              self.createRoom()
              house.style.cursor='default';
              // self.toolname='none';
            })
           
        

      $(function() {
        
          // self.makeDraggable(evt)
          // if(evt.which==3){
          //   evt.preventDefault();
          //   $(evt.target).remove();
          // }


        // let el = document.querySelector('rect');
        // if (document.addEventListener) {
        //   el.addEventListener('contextmenu', function(e) {
        //     // if(e.target. == 'rect')
        //     console.log(e)
        //     alert(JSON.stringify(e)+'ddddd'); //here you draw your own menu
            
        //     e.preventDefault();
        //   }, false);
        // } 



      })

     
    }
   
   
   
   
  //  ......POLYGON...............................
    if(self.toolname=='polygon'){
    
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

getPointerOnSVG(){
  let self = this;
  $("svg").click(function(e) {
    console.log(e)
      var offset = $(this).offset();
      
    self.x = (e.pageX - offset.left);
    self.y = (e.pageY - offset.top);
  });
}

createRoom(){
  let that = this;
 const selector = d3.select("#house");
  selector.on('click', null)
  selector.append("rect").
  // attr('x', this.x).
  // attr('y', this.y).
  attr('width','50').
  attr('height','50').
  attr('stroke','black').
  attr('stroke-width','3').
  attr('fill','white').
  attr('class','draggable')
  .attr("x", d => this.x)
      .attr("y", d => this.y)
  .call(that.drag_this);

document.querySelectorAll('rect').forEach((el)=>{
  el.style.cursor='move';
})

// $(function() {
    $('rect').mousedown(function(evt){
      // d3.select('rect').on('mousedown', (ev)=>{
    
        console.log(evt)
        that.makeDraggable(evt)
       })
      
    // })

}
// $("svg").mousedown(function(evt) {

 makeDraggable(evt) {
   var self = this
   console.log(evt)
  // var svg = evt;
  var rect = d3.select('svg');
  var svg = evt.target;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  function startDrag(evt) {
    console.log('m_down'+evt)
    if (evt.target.classList.contains('draggable')) {
      console.log('dragable')
      self.selectedElement = evt.target;
      self.offset = getMousePosition(evt);
      self.offset.x -= parseFloat(self.selectedElement.getAttributeNS(null, "x"));
      self.offset.y -= parseFloat(self.selectedElement.getAttributeNS(null, "y"));
    }
  }

  function getMousePosition(evt) {
    var CTM = svg.getScreenCTM();
    return {
      x: (evt.clientX - CTM.e) / CTM.a,
      y: (evt.clientY - CTM.f) / CTM.d
    };
  }
  



  function drag(evt) {
    console.log('M_move'+ evt)
    if (self.selectedElement) {
      evt.preventDefault();
      var coord = getMousePosition(evt);
      console.log(JSON.stringify(self.selectedElement)+ coord)
      self.selectedElement.setAttributeNS(null, "x", coord.x - self.offset.x);
      self.selectedElement.setAttributeNS(null, "y", coord.y - self.offset.y);
    }
  }
  function endDrag(evt) {
    console.log('M_upAndLeave'+ evt)
    self.selectedElement = null;

  }
}

drag_this = d3.drag()
    .on('start',function (d) {
      d3.select(this).raise().attr("stroke", "black");
    })
    .on('drag',function(d){
      d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    });



}
