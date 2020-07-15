import { Injectable } from '@angular/core';
import { PopoverController, ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';
//import { HomePage } from '../home/home.page';
import { UserService } from './user.service';
import { ResizeRoomComponent } from '../pages/resize-room/resize-room.component';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class PopAndOtherService {

  constructor( private popoverController: PopoverController, private modalController: ModalController,private user: UserService) { }
  x;
  y;
  poly;
 // .............right click menu...................
 async presentPopover(ev: any) {
   const popover = await this.popoverController.create({
     component:ContextComponent,
     event: ev,
     translucent: true,
   });
   return await popover.present();
 }

 async dismissPopover(ev) {  
   let that = this;  
    this.popoverController.dismiss().then(() => {
      if(ev=="side"){
        //this.noResize=true;
      }
     if(ev.remove){
       d3.select('#resDoor').remove();
       d3.select('#resizeW').remove();
       d3.select('#resizeH').remove();
       d3.select('#'+that.user.sel_Element[0].sel_id).remove()
       } else if(ev.resize == true && that.user.sel_Element[0].sel_el == 'door'){
       // d3.select('#'+that.user.sel_Element[0].sel_id).on('drag', null);
      // that.editDoor(that.user.sel_Element[0].sel_id)
       } else if(that.user.sel_Element[0].sel_el == 'door' && ev.rotate == true){
      // that.rotateDoor(that.user.sel_Element[0].sel_id)
       } else if(ev.move == true && that.user.sel_Element[0].sel_el == 'door'){
      // that.move(that.user.sel_Element[0].sel_id)
       }
     });  
 
    if(ev.rotate==true)
    { 
     var Id=this.user.roomId;
     var roomId=Id.substring(0,Id.length-1)
     console.log(roomId)
     let angle=d3.selectAll("#"+roomId).attr('class');
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
       alert("hello")
       let x=parseInt(pointx);
       let y=parseInt(pointy)
        this.poly=[{'x':x,'y':y},
                   {'x':x,'y':y+3}, 
                   {'x':x-12,'y':y+3},
                   {'x':x-12,'y':y+15},
                   {'x':x-15,'y':y+15},
                   {'x':x-15,'y':y},
                  ]
     this.drawNewPolygon();
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
        d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
         .data([poly])
       .enter().append("polygon")
         .attr("points",function(d) { 
             return d.map(function(d) {
                 return [(d.x),(d.y)].join(",");
             }).join(" ");
         }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room').call(movePoly);
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
        d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
         .data([poly])
       .enter().append("polygon")
         .attr("points",function(d) { 
             return d.map(function(d) {
                 return [(d.x),(d.y)].join(",");
             }).join(" ");
         }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room').call(movePoly);
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
        d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
         .data([poly])
       .enter().append("polygon")
         .attr("points",function(d) { 
             return d.map(function(d) {
                 return [(d.x),(d.y)].join(",");
             }).join(" ");
         }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
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
 }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room').call(movePoly);
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
 }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room').call(movePoly);
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
 }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room').call(movePoly);
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
 }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
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
     }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room').call(movePoly);
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
       }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room').call(movePoly);
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
       }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room').call(movePoly);
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
       }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
       let that=this;
   d3.selectAll('polygon').on('contextmenu', function(d,i){
     that.user.roomId=d3.event.target.id+"T"
     d3.event.preventDefault();
     console.log(that.user.roomId+'T')
     that.presentPopover(d)
   })
 }
 }
 let h=d3.select("#"+roomId)
 //d3.drag.on('drag',d)
 //console.log(h)
    }
 
 }
 drawNewPolygon(){
  var Id=this.user.roomId;
  var roomId=Id.substring(0,Id.length-1)
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
  d3.selectAll('#'+roomId).remove();
  d3.selectAll("svg").selectAll('polygon'+' '+'#'+roomId)
    .data([this.poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [(d.x),(d.y)].join(",");
        }).join(" ");
    }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
    let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"T"
  d3.event.preventDefault();
  console.log(that.user.roomId+'T')
  that.presentPopover(d)
})
 }
}

@Component({
  selector: 'context',
  template: `<ion-list>
  <ion-item button id='res_but' (click)='activateResize()'>Resize</ion-item>
  <ion-item button (click)='move()'>Move</ion-item>
  <ion-item button (click)='remRoom()'>Remove</ion-item>
  <ion-item button (click)='rotateRoom()'>Rotate</ion-item>
  <ion-item button *ngIf='user.sel_Element[0].sel_el == "door"' (click)='rotate()'>Rotate</ion-item>
  <ion-item button id='res_but' (click)="resizePolyRoom('side')">Resize Room </ion-item>
</ion-list>`,
})
export class ContextComponent {
  constructor( private pop:PopAndOtherService,private user: UserService, private resize:ResizeRoomComponent){}
  resizeRoom = false;
  removeRoom = false;
  rotateRooms=false;
  rotatedoor = false;
  move_el = false;

  activateResize(){
    this.resizeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom, rotate:this.rotateRooms}
    this.pop.dismissPopover(ev);
  }
  remRoom(){
    this.removeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom , rotate:this.rotateRooms}
    this.pop.dismissPopover(ev);
  }
  rotateRoom(){
    //console.log(this);
    this.rotateRooms =true;
   // that.polyAng;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom , rotate:this.rotateRooms}
    this.pop.dismissPopover(ev);
  }
  rotate(){
    this.rotatedoor = true;
    let ev = { resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    this.pop.dismissPopover(ev);
  }
  move(){
    this.move_el = true;
    let ev = { move: this.move_el, resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    this.pop.dismissPopover(ev);
  }
  resizePolyRoom(side){
    //alert("resizing room")
    let ev = { move: this.move_el, resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    this.pop.dismissPopover(ev);
    this.resize.resizeRoom();
  }
}