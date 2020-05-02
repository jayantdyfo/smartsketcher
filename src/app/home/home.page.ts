import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import * as d3 from 'd3';
import { PopoverController, ModalController } from '@ionic/angular';
import { drag } from 'd3';
import { DriverProvider } from 'protractor/built/driverProviders';
import { ɵsetRootDomAdapter } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  constructor(
    private user: UserService, private popoverController: PopoverController, private modalController: ModalController,
  ) {}
  
  viewDetails = ViewLayoutComponent;
  iconname='square-outline'
  x; //..x,y for rect......
  y;
  i=0;
  polyAng=0;
  roomId;
  image;
  x1;
  x2:number; 
  y1;
  y2:number;
  svg;
  propbox = false;
  properties=['Room', 'Device', 'Decorations'];
  R_type: RoomData
  roomtypes = [
    'bedroom' , 'livingroom' , 'bathroom' , 'balcony' , 'kitchen' , 'outside' , 'stairs'
  ]
  room_type:any = this.roomtypes[0]
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
  // "television" | "table" | "bed" | "sofa_1seat" | "sofa_2seat" | "dining_set"
  decorations=[
    {img:'assets/img/bed_7.png', name:'bed'},
    {img:'assets/img/bed_single.png', name:'bed'},
    {img:'assets/img/sofa-1seat.png', name:'sofa_1seat'},
    {img:'assets/img/sofa-2seat.png', name:'sofa_2seat'},
    {img:'assets/img/table.png', name:'table'},
    {img:'assets/img/television.png', name:'television'},
    {img:'assets/img/dining-set.png', name:'dining_set'},
    // {img:'assets/img/cooler.png', type:'bed'},
    // {img:'assets/img/bed_7.png'},
    // {img:'assets/img/bed_7.png'},
    // {img:'assets/img/bed_7.png'},
    ];
  floor=[
    {img:'assets/img/floor.png', id:1},
    {img:'assets/img/marble.jpg', id:2},
    {img:'assets/img/tiles1.png', id:3},
    {img:'assets/img/tiles2.jpg', id:4},
    {img:'assets/img/tiles3.png', id:5},
    {img:'assets/img/tiles4.png', id:6},
    {img:'assets/img/tiles5.png', id:7},
    {img:'assets/img/tiles6.png', id:8},
    {img:'assets/img/tiles7.png', id:9},
    {img:'assets/img/tiles8.png', id:10},
    {img:'assets/img/tiles9.png', id:11},
    {img:'assets/img/tiles10.png', id:12},
    {img:'assets/img/tiles11.png', id:13},
    {img:'assets/img/tiles12.png', id:14},
    {img:'assets/img/tiles13.png', id:15},
    {img:'assets/img/tiles14.png', id:16},
    {img:'assets/img/tiles15.png', id:17},
    {img:'assets/img/tiles16.png', id:18},
  ];
  props=this.properties[0]
  data;  
 index=0;
  ngOnInit() {
    // this.drag()
    // this.user.arraydata = JSON.parse(this.user.rapidPageValue);
    // this.showarray = this.user.rapidPageValue;
  this.svg=d3.select('svg');
  //   var width = 1050;
  //   var height = 680;
  //   //this.index=0;
  //   this.svg = d3.select("#layout")
  //   .append("svg")
  //  .attr("width", width)
  //   .attr("height", height)
  //   .style('border',"1px solid black").
  //   style('margin','-7%')
  //   .append('defs');
    //.append('polygon')
    
  //this.svg=document.querySelector('svg');
  
  }

    selectProps(e){
    //console.log(e)
    }
  roomNO=0;
  selectedElement;
  offset
  toolname='none';
   select(ev, tool){
    //document.getElementById('layout').style.cursor = "crosshair";
    window['d3'] = d3;
    var self=this;
    d3.select('#tempImg').remove();
    self.toolname=tool;
      let house = d3.selectAll("svg");
      //console.log(house)
      house.raise().style('cursor','cell');
        if(self.toolname=='rectangle'){
          self=this;
            self.getPointerOnSVG();
            house.on('click', (e)=>{ 
              self.createRoom(this)
              house.style('cursor','default');
              self.toolname='none';
            })  
    }
   
   
   
   
  //  ......POLYGON...............................
    if(self.toolname=='polygon'){
      var self=this;
      //console.log(d3.select('svg'));
      d3.selectAll('svg').
       on('mousedown', 
       //this.pointx1
       function(){
        var x=d3.event.x-82;
        var y=d3.event.y-66;
       self.pointx1(x,y)
      })
    }
    if(self.toolname=='L_shape'){
      var self=this;
      //console.log(d3.select('svg'));
      d3.selectAll('svg').on('click', 
       function(){
         let points=d3.mouse(d3.event.currentTarget)
        // var x=d3.event.x-82;
        // var y=d3.event.y-66;
       self.lshape(points)
      })
    }
    if(self.toolname=='U_shape'){
      var self=this;
      //console.log(d3.select('svg'));
      d3.selectAll('svg').
       on('click', 
       //this.pointx1
       function(){
        var points=d3.mouse(d3.event.currentTarget)
        // var x=d3.event.x-82;
        // var y=d3.event.y-66;
       self.ushape(points)
      })
    }
    if(self.toolname=='T_shape'){
      var self=this;
     
      //console.log(d3.select('svg'));
      d3.selectAll('svg').
       on('click', 
       //this.pointx1
       function(){
         var points=d3.mouse(d3.event.currentTarget)
        // var x=d3.event.x-82;
        // var y=d3.event.y-66;
       // alert(t)
       self.tshape(points)
      })
    }
 }
 lshape(coor){
   let that =this;
   let x=coor[0];
   let y=coor[1];
   //console.log(t)
   let id=this.index++;
   //console.log(this.index++)
   //console.log(id)
    var poly=[{"x":x, "y":y},
    {"x":x,"y":y+15},
    {"x":x+15,"y":y+15},
    {"x":x+15,"y":y+12},
    {"x":x+3,"y":y+12}, 
    {"x":x+3,"y":y}];       
let polygonL=   d3.selectAll("svg").selectAll('polygon') 
    d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
    .data([poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [(d.x),(d.y)].join(",");
        }
        ).join(" ");
    }).attr('id','r-'+id+'_1d').attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class',"0 room");
 var movePoly = d3.drag()
                        .on("start", function () {
                          d3.select(this).attr('stroke','red');
                          d3.select(this).attr('cursor','grab');
                          // d3.event.target.attr('stroke','red');
                          //console.log(d3.select(this))
                           //alert(d3.event.currentTarget);
                         })
                        .on("drag", function (d, i) {

                            that.x = that.x || 0;
                            that.y = that.y || 0;

                            that.x += d3.event.dx;
                            that.y += d3.event.dy;
                            d3.select(this).attr("transform", "translate(" + that.x + "," + that.y + ")");

                        })
                        .on("end", function () {
                          d3.select(this).attr("stroke", "black");
                          d3.select(this).attr('cursor','auto');
                          //d3.event.target.style('stroke','black');
                        });
    //var rotate=d3.event(this).attr('transform','rotate(90deg)')
    d3.selectAll("polygon").call(movePoly)
    d3.selectAll('polygon').on('contextmenu', function(d,i){
      that.user.roomId=d3.event.target.id+"L"
      d3.event.preventDefault();
    // console.log(that.user.roomId+"L");
      that.presentPopover(d)
    })
 }
//   drag2(){ 
//     function dragstarted(d) {
//       d3.select(this).raise().attr("stroke", "black");
//     }
  
//     function dragged(d) {
//       d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
//     }
  
//     function dragended(d) {
//       d3.select(this).attr("stroke", null);
//     }
  
//     return d3.drag()
//         .on("start", dragstarted)
//         .on("drag", dragged)
//         .on("end", dragended);
//  }
//  movePoly={
//   function dragstarted(d) {
//     d3.select(this).raise().attr("stroke", "black");
//   }

//   function dragged(d) {
//     d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
//   }

//   function dragended(d) {
//     d3.select(this).attr("stroke", null);
//   }

//   return d3.drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended);
//  }
 ushape(coor){
   let that=this;
  let x=coor[0];
  let y=coor[1];
  let id=this.index++;
   var poly=[{'x':x,'y':y},
              {'x':x,'y':y+15}, 
              {'x':x+20,'y':y+15},
              {'x':x+20,'y':y},
              {'x':x+16,'y':y},
              {'x':x+16,'y':y+12},
              {'x':x+4,'y':y+12},
              {'x':x+4,'y':y}
             ]
  d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
    .data([poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [(d.x),(d.y)].join(",");
        }).join(" ");
    }).attr('id','r-'+id+'_1d').attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class',"0 room");
    var movePoly = d3.drag()
                        .on("start", function () {
                          d3.select(this).attr('stroke','red');
                          d3.select(this).attr('cursor','grab');
                          // d3.event.target.attr('stroke','red');
                           //alert(d3.event.currentTarget);
                         })
                        .on("drag", function (d, i) {

                            that.x = that.x || 0;
                            that.y = that.y || 0;
                            // that.x += d3.mouse(d3.event.currentTarget);
                            // //that.y += d3.event.dy;{}
                            // d3.select(this).attr("transform", "translate(" + that.x[0] + "," + that.x[1] + ")");
                            that.x += d3.event.dx;
                            that.y += d3.event.dy;
                            d3.select(this).attr("transform", "translate(" + that.x + "," + that.y + ")");

                        })
                        .on("end", function () {
                          d3.select(this).attr("stroke", "black");
                          d3.select(this).attr('cursor','auto');
                          //d3.event.target.style('stroke','black');
                        });

d3.selectAll("polygon").call(movePoly);
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"U"
  d3.event.preventDefault();
  console.log(that.user.roomId+"U");
  that.presentPopover(d)
})
 }
tshape(coor){
  let that=this;
  let x=coor[0];
   let y=coor[1];
   let id=this.index++;
  var poly=[{'x':x,'y':y},
  {'x':x,'y':y+4}, 
  {'x':x+6,'y':y+4},
  {'x':x+6,'y':y+20},
  {'x':x+10,'y':y+20},
  {'x':x+10,'y':y+4},
  {'x':x+16,'y':y+4},
  {'x':x+16,'y':y}
 ]
  d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
    .data([poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [(d.x),(d.y)].join(",");
        }).join(" ");
    }).attr('id','r-'+id+'_1d').attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class',"0 room");
    //.attr('class',"room");

    // //alert('TTTTTTTTTTtt')
    // console.log(d3.selectAll('polygon'))
    
  //   $(function() {
  //     $("svg").mousedown(function(e) {
      
  //       var offset = $(this).offset(); 
  //     self.x1 = (e.pageX - offset.left);
  //     self.y1 = (e.pageY - offset.top);
  //     });
  //     });
  //     $(function() {
  //       $("svg").mouseup(function(e) {
        
  //         var offset = $(this).offset();
  //         self.x2 = (e.pageX - offset.left);
  //         self.y2 = (e.pageY - offset.top);
  //        });
  //       });
  // // alert("x1"+self.x1+"y1"+self.y2+"x2"+self.x2+"y2"+self.y2);
  //   this.svg.append("line")
  //      .attr("x1", self.x1)
  //      .attr("x2", self.x2)
  //      .attr("y1", self.y1)
  //      .attr("y2", self.y2)
  //      .attr("stroke", "black")
  //      .attr('stroke-width','1')
  //   // d3.selectAll("svg").append('polygon').attr('points', points).attr('fill','none').attr('stroke','black').attr('stroke-width',3);
    var points= function(){
       
    }
    var movePoly = d3.drag()
                        .on("start", function () {
                          console.log(d3.select(this))
                          d3.select(this).attr('stroke','red');
                          d3.select(this).attr('cursor','grab');
                          // d3.event.target.attr('stroke','red');
                           //alert(d3.event.currentTarget);
                         })
                        .on("drag", function (d, i) {

                            that.x = that.x || 0;
                            that.y = that.y || 0;
                            // that.x += d3.mouse(d3.event.currentTarget);
                            // //that.y += d3.event.dy;{}
                            // d3.select(this).attr("transform", "translate(" + that.x[0] + "," + that.x[1] + ")");

                            that.x += d3.event.dx;
                            that.y += d3.event.dy;
                           
                            d3.select(this).attr("transform", "translate(" + that.x + "," + that.y + ")");

                        })
                        .on("end", function () {
                          
                          d3.select(this).attr("stroke", "black");
                          d3.select(this).attr('cursor','auto');
                          //d3.event.target.style('stroke','black');
                        });

d3.selectAll("polygon").call(movePoly);
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"T"
  d3.event.preventDefault();
  console.log(that.user.roomId+"T");
  that.presentPopover(d)
})
    // .data(myData)
    // .text(function (d, i) {
    //      return d;
    // });
}
allowDrop(ev) {
  ev.preventDefault();
}

pointx1(x,y){
  var self=this;
   d3.selectAll('svg')
  .on('mouseup',function(){
    var x1=d3.event.x-82;
     var y1=d3.event.y-66;
     self.draw(x,y,x1,y1)
   }) 
}

draw(x,y,x1,y1){
let self=this;
d3.selectAll('svg'). append("line")
.attr("x1", x)
.attr("x2", x1)
.attr("y1", y)
.attr("y2", y1)
.attr("stroke", "black")
.attr('stroke-width','3')
.attr('class','room').style('z-index','0').on('click',function(){
  self.drawPolygon()
})

}
drawPolygon(){
  alert("dyhjk")

}
 
    // Drag(){
    //   d3.drag()
    //   // .origin(function(d) { return d; })
		// 	.on("dragstart", this.dragstarted)
		// .on("drag", this.dragged);
    // }
    // var Drag = d3.behavior.drag()
		// 		.origin(function(d) { return d; })
		// 		.on("dragstart", dragstarted)
		// 		.on("drag", dragged);
			
			//Called when drag event starts. It stop the propagation of the click event
			 dragstarted(d){
				d3.event.sourceEvent.stopPropagation();
			}
			
			//Called when the drag event occurs (object should be moved)
			dragged(d){
        var self=this;
        d.x = d3.event.x;
        alert("gdjhfdksjbl")
				d.y = d3.event.y;
				//Translate the object on the actual moved point
				// d3.select(this).attr({
				// 	transform: "translate(" + d.x + "," + d.y + ")"
				// });
			}
			
dragNResize(){
 alert("dvdshhvk")
}
getPointerOnSVG(){
  let self = this;
  $("svg").mousedown(function(e) {
    //console.log(e)
      var offset = $(this).offset();
      
    self.x = (e.pageX - offset.left);
    self.y = (e.pageY - offset.top);
  });
}
// .............right click menu...................
async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: ContextComponent,
    event: ev,
    translucent: true,
  });
  return await popover.present();
}
async dismissPopover(ev) {  
  let that = this;  
   this.popoverController.dismiss().then(() => {
    if(ev.remove){
      d3.select('#resDoor').remove();
      d3.select('#resizeW').remove();
      d3.select('#resizeH').remove();
      d3.select('#'+that.user.sel_Element[0].sel_id).remove()
      } else if(ev.resize == true && that.user.sel_Element[0].sel_el == 'door'){
      // d3.select('#'+that.user.sel_Element[0].sel_id).on('drag', null);
      that.editDoor(that.user.sel_Element[0].sel_id)
      } else if(that.user.sel_Element[0].sel_el == 'door' && ev.rotate == true){
      that.rotateDoor(that.user.sel_Element[0].sel_id)
      } else if(ev.move == true && that.user.sel_Element[0].sel_el == 'door'){
      that.move(that.user.sel_Element[0].sel_id)
      }
    });

   if(ev.rotate==true)
   { 
    var Id=this.user.roomId;
    var roomId=Id.substring(0,Id.length-1)
     //this.polyAng=this.polyAng+10;
    console.log(roomId)
    console.log(Id.includes('L'))
    console.log(Id.includes('U'))
    console.log(Id.includes('T'))
    let angle=d3.selectAll("#"+roomId).attr('class');
    console.log(angle)
    let points=d3.selectAll("#"+roomId).attr('points').substring(0,30)
    let commaIndex= points.indexOf(',')
    let pointx=points.substring(0,commaIndex);
    let pointy=points.substring(commaIndex+1,points.length)
  //   let str=angle.substring(7,angle.length)
  //   let index=str.indexOf(')');
  //  let polyAng=str.substring(0,index);
   let setAngle=parseInt(angle)
   if(Id.includes('L')==true)
   {
    
    if(setAngle==0)
    {
      let x=parseInt(pointx);
      let y=parseInt(pointy)
       var poly=[{'x':x,'y':y},
                  {'x':x,'y':y+3}, 
                  {'x':x-12,'y':y+3},
                  {'x':x-12,'y':y+15},
                  {'x':x-15,'y':y+15},
                  {'x':x-15,'y':y},
                 ]
       d3.selectAll('#'+roomId).remove();          
      d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
        .data([poly])
      .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d) {
                return [(d.x),(d.y)].join(",");
            }).join(" ");
        }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room');
        let that=this;
        d3.selectAll('polygon').on('contextmenu', function(d,i){
          that.user.roomId=d3.event.target.id+'L'
          d3.event.preventDefault();
          console.log(that.user.roomId+'L');
          that.presentPopover(d)
        })
    }
    if(setAngle==90)
    {
      let x=parseInt(pointx);
      let y=parseInt(pointy)
       var poly=[{'x':x,'y':y},
                  {'x':x+15,'y':y}, 
                  {'x':x+15,'y':y+15},
                  {'x':x+12,'y':y+15},
                  {'x':x+12,'y':y+3},
                  {'x':x,'y':y+3},
                 ]
       d3.selectAll('#'+roomId).remove();          
      d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
        .data([poly])
      .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d) {
                return [(d.x),(d.y)].join(",");
            }).join(" ");
        }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room');
        let that=this;
        d3.selectAll('polygon').on('contextmenu', function(d,i){
          that.user.roomId=d3.event.target.id+'L'
          d3.event.preventDefault();
          console.log(that.user.roomId+'L');
          that.presentPopover(d)
        })
    }
    if(setAngle==180)
    {
      let x=parseInt(pointx);
      let y=parseInt(pointy)
       var poly=[{'x':x,'y':y},
                  {'x':x,'y':y+3}, 
                  {'x':x+15,'y':y+3},
                  {'x':x+15,'y':y-12},
                  {'x':x+12,'y':y-12},
                  {'x':x+12,'y':y},
                 ]
       d3.selectAll('#'+roomId).remove();          
      d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
        .data([poly])
      .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d) {
                return [(d.x),(d.y)].join(",");
            }).join(" ");
        }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room');
        let that=this;
        d3.selectAll('polygon').on('contextmenu', function(d,i){
          that.user.roomId=d3.event.target.id+'L'
          d3.event.preventDefault();
          console.log(that.user.roomId+'L');
          that.presentPopover(d)
        })
    }
    if(setAngle==270)
    {
      let x=parseInt(pointx);
      let y=parseInt(pointy)
      var poly=[{"x":x, "y":y},
      {"x":x,"y":y+15},
      {"x":x+15,"y":y+15},
      {"x":x+15,"y":y+12},
      {"x":x+3,"y":y+12}, 
      {"x":x+3,"y":y}];   
       d3.selectAll('#'+roomId).remove();          
      d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
        .data([poly])
      .enter().append("polygon")
        .attr("points",function(d) { 
            return d.map(function(d) {
                return [(d.x),(d.y)].join(",");
            }).join(" ");
        }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room');
        let that=this;
        d3.selectAll('polygon').on('contextmenu', function(d,i){
          that.user.roomId=d3.event.target.id+'L'
          d3.event.preventDefault();
          console.log(that.user.roomId+'L');
          that.presentPopover(d)
        })
      }
    }
  if(Id.includes('U')==true){
  if(setAngle==0){
  let x=parseInt(pointx);
      let y=parseInt(pointy)
    var poly=[{'x':x,'y':y},
    {'x':x,'y':y+20}, 
    {'x':x+15,'y':y+20},
    {'x':x+15,'y':y+16},
    {'x':x+4,'y':y+16},
    {'x':x+4,'y':y+4},
    {'x':x+15,'y':y+4},
    {'x':x+15,'y':y}
   ]
   d3.selectAll('#'+roomId).remove();
d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
.data([poly])
.enter().append("polygon")
.attr("points",function(d) { 
return d.map(function(d) {
  return [(d.x),(d.y)].join(",");
}).join(" ");
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room');
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"U"
  d3.event.preventDefault();
  console.log(that.user.roomId+'U');
  that.presentPopover(d)
})
}
if(setAngle==90){
  let x=parseInt(pointx);
      let y=parseInt(pointy)
    var poly=[{'x':x,'y':y},
    {'x':x,'y':y+15}, 
    {'x':x+4,'y':y+15},
    {'x':x+4,'y':y+4},
    {'x':x+16,'y':y+4},
    {'x':x+16,'y':y+15},
    {'x':x+20,'y':y+15},
    {'x':x+20,'y':y}
   ]
   d3.selectAll('#'+roomId).remove();
d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
.data([poly])
.enter().append("polygon")
.attr("points",function(d) { 
return d.map(function(d) {
  return [(d.x),(d.y)].join(",");
}).join(" ");
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room');
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"U"
  d3.event.preventDefault();
  console.log(that.user.roomId+'U');
  that.presentPopover(d)
})
}
if(setAngle==180){
  let x=parseInt(pointx);
      let y=parseInt(pointy)
    var poly=[{'x':x,'y':y},
    {'x':x,'y':y+4}, 
    {'x':x+11,'y':y+4},
    {'x':x+11,'y':y+16},
    {'x':x,'y':y+16},
    {'x':x,'y':y+20},
    {'x':x+15,'y':y+20},
    {'x':x+15,'y':y}
   ]
   d3.selectAll('#'+roomId).remove();
d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
.data([poly])
.enter().append("polygon")
.attr("points",function(d) { 
return d.map(function(d) {
  return [(d.x),(d.y)].join(",");
}).join(" ");
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room');
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"U"
  d3.event.preventDefault();
  console.log(that.user.roomId+'U');
  that.presentPopover(d)
})
}
if(setAngle==270){
  let x=parseInt(pointx);
      let y=parseInt(pointy)
      var poly=[{'x':x,'y':y},
      {'x':x,'y':y+15}, 
      {'x':x+20,'y':y+15},
      {'x':x+20,'y':y},
      {'x':x+16,'y':y},
      {'x':x+16,'y':y+12},
      {'x':x+4,'y':y+12},
      {'x':x+4,'y':y}
      ]
   d3.selectAll('#'+roomId).remove();
d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
.data([poly])
.enter().append("polygon")
.attr("points",function(d) { 
return d.map(function(d) {
  return [(d.x),(d.y)].join(",");
}).join(" ");
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room');
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"U"
  d3.event.preventDefault();
  console.log(that.user.roomId+'U');
  that.presentPopover(d)
})
}
}
if(Id.includes('T')==true)
{
if(setAngle==0){
let x=parseInt(pointx);
let y=parseInt(pointy)
var poly=[{'x':x,'y':y},
  {'x':x,'y':y+4}, 
  {'x':x+16,'y':y+4},
  {'x':x+16,'y':y+10},
  {'x':x+20,'y':y+10},
  {'x':x+20,'y':y-4},
  {'x':x+16,'y':y-4},
  {'x':x+16,'y':y}
 ]
 d3.selectAll('#'+roomId).remove();
  d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
    .data([poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [(d.x),(d.y)].join(",");
        }).join(" ");
    }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room');
    let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"T"
  d3.event.preventDefault();
  console.log(that.user.roomId+'T');
  that.presentPopover(d)
})
}
if(setAngle==90){
  let x=parseInt(pointx);
  let y=parseInt(pointy)


  var poly=[{'x':x,'y':y},
    {'x':x,'y':y+4}, 
    {'x':x+16,'y':y+4},
    {'x':x+16,'y':y},
    {'x':x+10,'y':y},
    {'x':x+10,'y':y-16},
    {'x':x+6,'y':y-16},
    {'x':x+6,'y':y}
   ]
   d3.selectAll('#'+roomId).remove();
    d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
      .data([poly])
    .enter().append("polygon")
      .attr("points",function(d) { 
          return d.map(function(d) {
              return [(d.x),(d.y)].join(",");
          }).join(" ");
      }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room');
      let that=this;
  d3.selectAll('polygon').on('contextmenu', function(d,i){
    that.user.roomId=d3.event.target.id+"T"
    d3.event.preventDefault();
    console.log(that.user.roomId+'T');
    that.presentPopover(d)
  })
}
if(setAngle==180){
  let x=parseInt(pointx);
  let y=parseInt(pointy)
  var poly=[{'x':x,'y':y},
    {'x':x+4,'y':y}, 
    {'x':x+4,'y':y+6},
    {'x':x+20,'y':y+6},
    {'x':x+20,'y':y+10},
    {'x':x+4,'y':y+10},
    {'x':x+4,'y':y+16},
    {'x':x,'y':y+16}
   ]
   d3.selectAll('#'+roomId).remove();
    d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
      .data([poly])
    .enter().append("polygon")
      .attr("points",function(d) { 
          return d.map(function(d) {
              return [(d.x),(d.y)].join(",");
          }).join(" ");
      }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room');
      let that=this;
  d3.selectAll('polygon').on('contextmenu', function(d,i){
    that.user.roomId=d3.event.target.id+"T"
    d3.event.preventDefault();
    console.log(that.user.roomId+'T');
    that.presentPopover(d)
  })
}
if(setAngle==270){
  let x=parseInt(pointx);
  let y=parseInt(pointy)
  var poly=[{'x':x,'y':y},
  {'x':x,'y':y+4}, 
  {'x':x+6,'y':y+4},
  {'x':x+6,'y':y+20},
  {'x':x+10,'y':y+20},
  {'x':x+10,'y':y+4},
  {'x':x+16,'y':y+4},
  {'x':x+16,'y':y}
 ]
   d3.selectAll('#'+roomId).remove();
    d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
      .data([poly])
    .enter().append("polygon")
      .attr("points",function(d) { 
          return d.map(function(d) {
              return [(d.x),(d.y)].join(",");
          }).join(" ");
      }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room');
      let that=this;
  d3.selectAll('polygon').on('contextmenu', function(d,i){
    that.user.roomId=d3.event.target.id+"T"
    d3.event.preventDefault();
    console.log(that.user.roomId+'T')
    that.presentPopover(d)
  })
}
}
   }

}
// ...........menu end......................

createRoom(ev){
  let that = this;
  let mouse = d3.mouse(d3.event.currentTarget)
  that.roomNO +=1 
  let r_id = that.roomNO;
 const selector = d3.select("#house");
  selector.on('click', null)
  selector.append("rect").
  attr('x', mouse[0]).
  attr('y', mouse[1]).
  attr('width','20').
  attr('height','20').
  attr('stroke','rgb(79, 39, 39)').
  attr('stroke-width','1').
  attr('fill','transparent').
  attr('id','r-'+r_id).
  attr('class','room')
  
//  ...to move element.....................
 let allRect = d3.selectAll('.room');
// allRect.style('cursor', 'move');
// allRect.call(d3.drag().on("start", started))
function started() {
  var currentEL = d3.select(this).classed("dragging", true);
  let curElOrigin ={x:parseFloat(currentEL.attr('x')), y:parseFloat(currentEL.attr('y'))}
  let clickDiff = {x:(d3.event.x-curElOrigin.x), y:(d3.event.y-curElOrigin.y)}
  let rightBar = d3.select('#resizeW');
  let bottomBar = d3.select('#resizeH');
  let DragBars ={
                    right:{x:parseFloat(rightBar.attr('x')),
                           y:parseFloat(rightBar.attr('y'))},
                    bottom:{x:parseFloat(bottomBar.attr('x')),
                            y:parseFloat(bottomBar.attr('y'))}
                  }
   let clickDiffBar = {
     right:{x:(d3.event.x-DragBars.right.x), y:(d3.event.y-DragBars.right.y)},
     bottom:{x:(d3.event.x-DragBars.bottom.x), y:(d3.event.y-DragBars.bottom.y)}
   }
  d3.event.on("drag", dragged).on("end", ended)
  function dragged(d) {
    currentEL.raise().attr("x", that.x = d3.event.x-clickDiff.x).attr("y", that.y = d3.event.y-clickDiff.y);
    rightBar.raise().attr('x',d3.event.x-clickDiffBar.right.x).attr('y',d3.event.y-clickDiffBar.right.y)
    bottomBar.raise().attr('x',d3.event.x-clickDiffBar.bottom.x).attr('y',d3.event.y-clickDiffBar.bottom.y)
  }
  function ended(d) {
    currentEL.classed("dragging", false);
  }
};
// ...end of move..............

// ....right click ........
allRect.on('contextmenu', function(d,i){
  d3.event.preventDefault();
  that.user.sel_Element.length=0;
  that.user.sel_Element.push({sel_id : d3.select(this).attr('id'), sel_el: 'room'})
  console.log(''+d+'--' + i);
  that.presentPopover(d);
})
// right click end................

// .....to resize...........
let toggle = false;
var res_Event = ()=>{return allRect.on('click', toResize)}
res_Event();
function toResize(){
  toggle = !toggle
  if(toggle){
    d3.select('#resizeH').remove()
    d3.select('#resizeW').remove()
    d3.select(this).style('cursor', 'move');
    d3.select(this).call(d3.drag().on("start", started))
    // d3.event.preventDefault();
    let curEl = d3.select(this)
    // ...........

    // .... To Resize HEIGHT................
    d3.select('svg').append('rect')
    .attr('x',curEl.attr('x'))
    .attr('y',parseFloat(curEl.attr('y'))+parseFloat(curEl.attr('height')))
    .attr('stroke','red')
    .attr('stroke-width','0.5')
    .attr('width',curEl.attr('width'))
    .attr('height','0.5')
    .attr('fill','none')
    .attr('id','resizeH')
    .style('z-index','2').style('cursor','ns-resize')
    .call(d3.drag().on('start',resHeight))
    function resHeight() {
  
      var dragBarH = d3.select(this).classed("dragging", true);
      let pre_y=d3.event.y
      let pre_H=parseFloat(curEl.attr('height'))
      d3.event.on("drag", dragged).on("end", ended);
    
      function dragged(d) {
        dragBarH.raise().attr("y",d3.event.y);
        // console.log(pre_y+pre_H+'---'+d3.event.y)
        d3.select('#resizeW').raise().attr('height',pre_H+(d3.event.y-pre_y))
        curEl.raise().attr('height',pre_H+(d3.event.y-pre_y))
      }
    
      function ended(d) {
        // console.log()
        dragBarH.classed("dragging", false);
      }
    } //.......end...

    // ....to resize WIDTH..............
    d3.selectAll('svg').append('rect')
    .attr('y',curEl.attr('y'))
    .attr('x',parseFloat(curEl.attr('x'))+parseFloat(curEl.attr('width')))
    .attr('stroke','red')
    .attr('stroke-width','1')
    .attr('height',curEl.attr('height'))
    .attr('width','0.5')
    .attr('fill','none')
    .attr('id','resizeW')
    .style('z-index','2').style('cursor','ew-resize')
    .call(d3.drag().on('start',reswidth))
    function reswidth() {
      var dragBarW = d3.select(this).classed("dragging", true);
      let pre_x=d3.event.x
      let pre_W=parseFloat(curEl.attr('width'))
      d3.event.on("drag", dragged).on("end", ended);
      function dragged(d) {
        dragBarW.raise().attr("x",d3.event.x);
        curEl.raise().attr('width',pre_W+(d3.event.x-pre_x))
        d3.select('#resizeH').attr('width',pre_W+(d3.event.x-pre_x))
      }
    
      function ended(d) {
        dragBarW.classed("dragging", false);
      }
    }
  } else{
    allRect.style('cursor','default').call(d3.drag().on("start", null))
    d3.select('#resizeH').remove()
    d3.select('#resizeW').remove()
  }
}
}

// .... To set floor...........................................
drag(e, fl) {
  // d3.event.preventDefault()
  let floor = d3.select(e.target).style('border','2px solid blue')
    floor.on('mouseleave', ()=>{floor.raise().style('border','none')})
    // d3.select(this).attr('pointer-events', 'none');
    floor.on("mousedown", pick)
    function pick(d) {
      d3.select('#tempImg').remove();
      d3.select('svg').style('cursor','crosshair').append('image')
                       .attr('href',fl.img)
                       .attr('height',10)
                       .attr('width',10)
                       .attr('x',d3.mouse(d3.event.currentTarget)[0])
                       .attr('y',d3.mouse(d3.event.currentTarget)[1])
                       .attr('id','tempImg')
      d3.select('svg').on('mousemove',selectEL)
      function selectEL(){
        d3.select('#tempImg').raise().attr('x',d3.mouse(d3.event.currentTarget)[0]+1)
                             .raise().attr('y',d3.mouse(d3.event.currentTarget)[1]+1)
            d3.selectAll('.room').on('mouseover',highlight)
          function highlight(){
              let el=d3.select(this).raise().attr('stroke','blue')
                  el.on('click',dropImg)
                  el.on('mouseleave',sel_rem)
          }
          function sel_rem(){
            d3.select(this).raise().attr('stroke','rgb(79, 39, 39)')
          }
        }

        function dropImg (){ 
          d3.select(this).raise().attr('stroke','rgb(79, 39, 39)')
          let floorid = d3.select('#fl'+fl.id)
          if(floorid.node()){
            console.log('id exist'+floorid.node())
            d3.select(this).raise().attr('fill','url(#fl'+fl.id+')')
          } else{
            d3.select('defs').append('pattern')
            .attr('x',0)
            .attr('y',0)
            .attr('height',10)
            .attr('width',10)
            .attr('id','fl'+fl.id)
            .attr('patternUnits',"userSpaceOnUse")
            .append('image')
            .attr('xlink:href',fl.img)
            .attr('height',10)
            .attr('width',10)
            .attr('x',0)
            .attr('y',0)
            d3.select(this).raise().attr('fill','url(#fl'+fl.id+')')
          }
          // .............REMOVE EVENTS AFTER SETTING FLOOR.................

          d3.selectAll('.room').on('click', null)
          d3.select(this).on('mouseleave',null)
          d3.select('#tempImg').remove();
          d3.select('svg').style('cursor','default')
          d3.select('svg').on('mousemove',null)
          d3.selectAll('.room').on('mouseover',null)
        }
 
 }
}

// drop(ev) {
//  // ev.preventDefault();
//   console.log(ev.target)
//   let self=this;
//     //var data = localStorage.getData("data");
//     var data=document.querySelectorAll('.mystyle');
//     let target=document.querySelector('svg');
//     $(function() {
//       $("svg").mousedown(function(e) {
      
//         var offset = $(this).offset();
//       self.x = (e.pageX - offset.left);
//       self.y= (e.pageY - offset.top);
//       });
//       });

//   this.svg.append('image')
//         .attr("href",this.image)
//         .attr("x", self.x)
//         .attr("y", self.y)
//         .attr("width", "6%")
//         .attr("height", "6%")
//         //  .attr('stroke-width','1')
//       }

      doorNO = 0;
     sel_door(type){
        let that = this;
        d3.select('#temp_door').remove();
        // that.doorNO += 1;
        let door;
        if(type == 'slider'){
         door = d3.select('#house').append('rect')
          .attr('height',0.5)
          .attr('width',8)
          .attr('stroke','yellow')
          .attr('stroke-width',0.5)
          .attr('x',0)
          .attr('y',0)
          .attr('class','door')
          .attr('id','temp_door');
          doorWithMouse()
        } else
        if(type =='door') {
    
        }
      function doorWithMouse(){
        d3.select('#house').on('mousemove',()=>{
          door.raise().attr('x',d3.mouse(d3.event.currentTarget)[0]+2)
              .raise().attr('y',d3.mouse(d3.event.currentTarget)[1]+2)
        })
        
      }
      d3.selectAll('.room').on('mouseover',highlite)
      function highlite(){
        d3.select(this).raise().attr('stroke','blue')
        d3.select(this).on('click',()=>{that.putDoor(this, door)})
      
      d3.select(this).on('mouseleave',()=>{d3.select(this).raise().attr('stroke','rgb(79, 39, 39)')})
      }
    }
    putDoor(ev, door){
      let that = this;
      that.doorNO += 1;
      let mouse = d3.mouse(ev)
      d3.select(ev).raise().attr('stroke','rgb(79, 39, 39)')
      .on('click', null)
      d3.selectAll('.room').on('mouseover',null)
      .on('mouseleave',null)
      d3.select('#house').on('mousemove',null)
      door.raise().attr('id','door'+that.doorNO).raise().attr('x',mouse[0])
                                                  .attr('y',mouse[1]+0.3)
                                                
      d3.selectAll('.door').raise().attr('stroke','yellow')
      .on('contextmenu', function(){
                  that.rightClickOnDoor(this)
      })
    }
    rightClickOnDoor(ev){
      let that=this;
        d3.event.preventDefault();
        that.user.sel_Element.length=0;
        that.user.sel_Element.push({sel_id : d3.select(ev).attr('id'), sel_el: 'door'})
        that.presentPopover('door');
    }

    editDoor(el_id){
      let that = this;
      let el = d3.select('#'+el_id).style('cursor','default')
                  .call(d3.drag().on('start',null).on('drag',null).on('end',null))
      let h = parseFloat(el.attr('height'))
      let w = parseFloat(el.attr('width'))
      let x = parseFloat(el.attr('x'))
      let y = parseFloat(el.attr('y'))
      // d3.select('svg').append('image').attr('x',el.attr('x')).attr('y',parseFloat(el.attr('y'))-10)
      // .attr('xlink:href','assets/icon/icon-minus.png')
      // .attr('height',30)
      // .attr('width',30)
      if(h < w){
        d3.select('svg').append('rect')
                        .attr('id','resDoor')
                        .attr('x',x+w+0.5)
                        .attr('y',y)
                        .attr('height',0.5)
                        .attr('width',0.5)
                        .style('cursor','ew-resize')
                        .attr('stroke','red')
                        .attr('stroke-width','0.5')
                        .call(d3.drag().on('start', function(){that.resize(el,this, 'w')}))
      } else {
        d3.select('svg').append('rect')
                        .attr('id','resDoor')
                        .attr('x',x)
                        .attr('y',y+h+0.5)
                        .attr('height',0.5)
                        .attr('width',0.5)
                        .style('cursor','ns-resize')
                        .attr('stroke','red')
                        .attr('stroke-width','0.5')
                        .call(d3.drag().on('start', function(){that.resize(el, this, 'h')}))
      }
      el.on('click', ()=> {d3.select('#resDoor').remove()})
    }


    rotateDoor(el_id){
      d3.select('#resDoor').remove();
     let el = d3.select('#'+el_id)
     let h = el.attr('height')
     let w = el.attr('width')
     el.raise().attr('height',w)
     el.raise().attr('width',h)
    }
  
    resize(currentEL,barEl,changeProp){
      let that = this;
      let dragBar = d3.select(barEl);
      let dragBarOrigin = {x: parseFloat(dragBar.attr('x')), y: parseFloat(dragBar.attr('y'))}
      let prePoint = {x:d3.event.x, y: d3.event.y}
      let curElProp ={w:parseFloat(currentEL.attr('width')), h:parseFloat(currentEL.attr('height'))}
      // let clickDiff = {x:(d3.event.x-curElOrigin.x), y:(d3.event.y-curElOrigin.y)}
      d3.event.on("drag", dragged).on("end", ended)
      function dragged(d) {
        let diff = {x: prePoint.x - d3.event.x, y: prePoint.y - d3.event.y}
        if(changeProp=='w'){
          currentEL.raise().attr("width", curElProp.w-diff.x);
          dragBar.raise().attr('x',dragBarOrigin.x-diff.x)
        } else if(changeProp=='h'){
          currentEL.raise().attr("height", curElProp.h-diff.y);
          dragBar.raise().attr('y',dragBarOrigin.y-diff.y)
        }
        
      }
      function ended(d) {
        currentEL.classed("dragging", false);
      }
    }

    move(el_id){
      let that = this;
      d3.select('#resDoor').remove();
      let el = d3.select('#'+el_id).call(d3.drag().on('start',started))  
      el.style('cursor','move')    
      function started() {
        var currentEL = el
        let curElOrigin ={x:parseFloat(currentEL.attr('x')), y:parseFloat(currentEL.attr('y'))}
        let clickDiff = {x:(d3.event.x-curElOrigin.x), y:(d3.event.y-curElOrigin.y)}
        d3.event.on("drag", dragged).on("end", ended)
        function dragged(d) {
          currentEL.raise().attr("x", that.x = d3.event.x-clickDiff.x).attr("y", that.y = d3.event.y-clickDiff.y);
        }
        function ended(d) {
          currentEL.classed("dragging", false);
        }
      };
    }


   rotateRoom(){
     alert("jvhfjhj")
   }

// this function is used to set deco.... and device...............
 drag1(ev,path,name,el) {
      var self=this;
    let element=ev.currentTarget;
    this.image=path;
    element.classList.add("mystyle");
     let allRect = d3.selectAll('.room')
     allRect.on('dragenter',function(){
      // d3.select(this).attr('fill','red');
     // self.drop(x,y);
     let newClass = d3.select(this).attr('id')+el;
    //  var x1=d3.select(this).attr('x');
    //  var coor=d3.mouse(d3.event.currentTarget)
      self.drop(newClass, name)
     })
   }

   drop(Class, name) {
   let self=this;
   self.i=self.i+1
   d3.selectAll('.room').on('drop',function(){
    var coor=d3.mouse(d3.event.currentTarget);
    // d3.select(this).attr('fill','none');
    let x=coor[0];
  let y=coor[1];
   d3.selectAll('svg') .append('image')
          .attr("xlink:href",self.image)
         .attr("x", x-4)
         .attr("y", y-1)
         .attr('id',"img"+self.i)
         .attr('alt', name)
          .attr("width", "14%")
          .attr("height", "14%")
          .attr('class',Class+ ' dragImg')
   })
          d3.selectAll('.room').on('click',null)
        d3.selectAll('.dragImg').on('click',this.delete);
        }
delete(){
   var del=d3.event.target.id
    alert(del);
    d3.select("#"+del).remove(); 
 }







    layout =false;
    
    saveView(){
      let that = this;
      // that.layout = true;
      // this.user.arraydata = JSON.parse(this.user.rapidPageValue);
      let rooms: RoomData[] = [];
      let doors = [];
      let entrance = [];
      d3.selectAll('.room').each( function () {
        let el = d3.select(this)
        let id = el.attr('id')
        const fl = (el.attr('fill')=='url(#fl1)') ? true : false;
        let rX = parseFloat(el.attr('x'))
        let rY = parseFloat(el.attr('y'))
        let rH = parseFloat(el.attr('height'))
        let rW = parseFloat(el.attr('width'))
        let decorations = []
        d3.selectAll('.'+id+'deco').each(function(){
          let curDeco = d3.select(this)
          let decX = parseFloat(curDeco.attr('x'))
          let decY = parseFloat(curDeco.attr('y'))
          let dx = ((decX-rX+4) * 100 / rW)//-(parseFloat(el.attr('width'))*2/100))
          let dy = ((decY-rY+1) * 100 / rH)//-(parseFloat(el.attr('height'))*2/100))
          dx = 19+((75-19)*dx/100)
          dy = 16+((76-16)*dy/100)+(dy*10/100)
          alert(dx+'----'+dy)
          // that.user.deco2Ddata.decorations.length=0;
          // that.user.deco2Ddata.decorations.push(
          //   {
          //       type: curDeco.attr('alt'),
          //       x: decX,
          //       y: decY,
          //       rotate: 0,
          //       scale: 0.7
          // })
          // console.log(that.user.deco2Ddata.decorations)
          decorations.push(
              {
                type: curDeco.attr('alt'),
                x2D: decX, //...values for 2d deco...
                y2D: decY, //...values for 2d deco...
                x: dx,
                y: dy,
                rotate: 0,
                scale: 0.7
              }
          )
              
        })

          rooms.push(
          {
            type: that.room_type,
            label: {
              name: that.room_type
            },
            coordinates: {
              type: 'rect',
              origin: {
                x: parseFloat(el.attr('x')),
                y: parseFloat(el.attr('y'))
              },
              w: parseFloat(el.attr('width')),
              h: parseFloat(el.attr('height'))
            },
            roomId: parseInt(id.slice(2)),
            active: true,
            floor: fl ? 'wooden' : 'marble',
            devices: [
            //   {
            //   type: 'chandelier',
            //   x: 50,
            //   y: 50,
            //   rotate: 0,
            //   deviceId: 1,
            //   scale: 0.5
            // }    
           ],
           
           decorations: [...decorations]
           
        }

        )
        

      });
      d3.selectAll('.door').each(function(){
        let doorEL =d3.select(this)
        let x= parseFloat(doorEL.attr('x'))
        let y= parseFloat(doorEL.attr('y'))
        let h= parseFloat(doorEL.attr('height'))
        let w= parseFloat(doorEL.attr('width'))
        if(x){
          doors.push(
            {
              origin: {
                x: x,
                y: y
              },
              length: h > w ? h : w,
              
              orientation: h > w ? 90 : 0,
            });
        }
      })
  
      entrance.push({
        x: 7,
        y: 5,
        length: 13,
        orientation:90
      })
      that.user.arraydata = {
        rooms : rooms,
        doors : doors,
        entrance : entrance
      }
      console.log(that.user.arraydata)
      // that.user.onHomeSelect();
      that.presentModal()
    }

    async presentModal() {
      const modal = await this.modalController.create({
        component: ViewLayoutComponent,
        componentProps: {
          // 'firstName': 'Douglas',
        },
          backdropDismiss: true 
      });
      return await modal.present();
    }
}
















// .......... custom component for right click menu.............
@Component({
  selector: 'context',
  template: `<ion-list>
  <ion-item button id='res_but' (click)='activateResize()'>Resize</ion-item>
  <ion-item button (click)='move()'>Move</ion-item>
  <ion-item button (click)='remRoom()'>Remove</ion-item>
  <ion-item button (click)='rotateRoom()'>Rotate</ion-item>
  <ion-item button *ngIf='user.sel_Element[0].sel_el == "door"' (click)='rotate()'>Rotate</ion-item>
</ion-list>`,
})
export class ContextComponent {
  constructor(public a:HomePage, private user: UserService){}
  resizeRoom = false;
  removeRoom = false;
  rotateRooms=false;
  rotatedoor = false;
  move_el = false;

  activateResize(){
    this.resizeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom, rotate:this.rotateRooms}
    this.a.dismissPopover(ev);
  }
  remRoom(){
    this.removeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom , rotate:this.rotateRooms}
    this.a.dismissPopover(ev);
  }
  rotateRoom(){
    //console.log(this);
    this.rotateRooms =true;
   // that.polyAng;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom , rotate:this.rotateRooms}
    this.a.dismissPopover(ev);
  }
  rotate(){
    this.rotatedoor = true;
    let ev = { resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    this.a.dismissPopover(ev);
  }
  move(){
    this.move_el = true;
    let ev = { move: this.move_el, resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    this.a.dismissPopover(ev);
  }

}
