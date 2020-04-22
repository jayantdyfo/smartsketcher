import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import * as d3 from 'd3';
import { PopoverController } from '@ionic/angular';
import { drag } from 'd3';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  constructor(
    private user: UserService, private popoverController: PopoverController,
  ) {}
  
  viewDetails = ViewLayoutComponent;
  iconname='square-outline'
  x; //..x,y for rect......
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
  // export default data;  

  ngOnInit() {
    // this.drag()
    // this.user.arraydata = JSON.parse(this.user.rapidPageValue);
    // this.showarray = this.user.rapidPageValue;
    // var width = 1050;
    // var height = 650;
  //   this.svg = d3.select("#layout")
  //   .append("svg")
  //  .attr("width", width)
  //   .attr("height", height)
  //   .style('border',"1px solid black").
  //   style('margin','-7%');
  //this.svg=document.querySelector('svg');
  }
  selectProps(e){
    //console.log(e)
  }


  roomNo=0;
  selectedElement;
  offset
  toolname='none';
  select(ev, tool){
    window['d3'] = d3;
    var self=this;
    d3.select('#tempImg').remove();
    self.toolname=tool;
      let house = d3.select("#house");
      house.raise().style('cursor','cell');
        if(self.toolname=='rectangle'){
          self=this;
            self.getPointerOnSVG();
            house.on('click', (e)=>{ 
              self.createRoom()
              house.style('cursor','default');
              self.toolname='none';
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
  $("svg").mousedown(function(e) {
    console.log(e)
      var offset = $(this).offset();
      
    self.x = (e.pageX - offset.left);
    self.y = (e.pageY - offset.top);
  });
}
// point
// getPointerOnMove(){
//   let self = this;
//   $("svg").mousemove(function(e) {
//     console.log(e)
//       var offset = $(this).offset();
//       let points={
//         x : (e.pageX - offset.left),
//         y : (e.pageY - offset.top)
//       } 
//       self.point=points;
    
//   });
// }
// .............right click menu...................
async presentPopover(ev: any) {
  const popover = await this.popoverController.create({
    component: ContextComponent,
    event: ev,
    translucent: true
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
}
// ...........menu end......................
roomNO = 0;

createRoom(){
  let that = this;
  that.roomNO +=1 
  let r_id = that.roomNO;
 const selector = d3.select("#house");
  selector.on('click', null)
  selector.append("rect").
  attr('x', that.x).
  attr('y', that.y).
  attr('width','50').
  attr('height','50').
  attr('stroke','rgb(79, 39, 39)').
  attr('stroke-width','5').
  attr('fill','transparent').
  attr('id','r-'+r_id).
  attr('class','room').style('z-index','0')
  
//  ...to move element.....................
 let allRect = d3.selectAll('rect');
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
    .attr('stroke-width','3')
    .attr('width',curEl.attr('width'))
    .attr('height','3')
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
    d3.select('svg').append('rect')
    .attr('y',curEl.attr('y'))
    .attr('x',parseFloat(curEl.attr('x'))+parseFloat(curEl.attr('width')))
    .attr('stroke','red')
    .attr('stroke-width','3')
    .attr('height',curEl.attr('height'))
    .attr('width','2')
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


 allowDrop(ev) {
  ev.preventDefault();
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
                       .attr('height',60)
                       .attr('width',60)
                       .attr('x',d3.event.x)
                       .attr('y',d3.event.y)
                       .attr('id','tempImg')
      d3.select('body').on('mousemove',selectEL)
      function selectEL(){
        d3.select('#tempImg').raise().attr('x',d3.event.x-30)
                                      .raise().attr('y',d3.event.y-45)
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
            .attr('height',40)
            .attr('width',40)
            .attr('id','fl'+fl.id)
            .attr('patternUnits',"userSpaceOnUse")
            .append('image')
            .attr('xlink:href',fl.img)
            .attr('height',40)
            .attr('width',40)
            .attr('x',0)
            .attr('y',0)
            d3.select(this).raise().attr('fill','url(#fl'+fl.id+')')
          }
          // .............REMOVE EVENTS AFTER SETTING FLOOR.................
          d3.select(this).on('click', null)
          d3.select(this).on('mouseleave',null)
          d3.select('#tempImg').remove();
          d3.select('svg').style('cursor','default')
          d3.select('body').on('mousemove',null)
          d3.selectAll('.room').on('mouseover',null)

        }
    }
  
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

  this.svg.append('image')
        .attr("href",this.image)
        .attr("x", self.x)
        .attr("y", self.y)
        .attr("width", "6%")
        .attr("height", "6%")
        //  .attr('stroke-width','3')
      }

      doorNO = 0;
      sel_door(type){
        let that = this;
        d3.select('#temp_door').remove();
        // that.doorNO += 1;
        let door;
        if(type == 'slider'){
         door = d3.select('#house').append('rect')
          .attr('height',4)
          .attr('width',50)
          .attr('stroke','yellow')
          .attr('stroke-width',5)
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
          door.raise().attr('x',d3.event.x-30)
          .raise().attr('y',d3.event.y-40)
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
      .attr('y',mouse[1])
      d3.selectAll('.door').on('contextmenu', function(){
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
                        .attr('x',x+w+4)
                        .attr('y',y)
                        .attr('height',4)
                        .attr('width',4)
                        .style('cursor','ew-resize')
                        .attr('stroke','red')
                        .attr('stroke-width','4')
                        .call(d3.drag().on('start', function(){that.resize(el,this, 'w')}))
      } else {
        d3.select('svg').append('rect')
                        .attr('id','resDoor')
                        .attr('x',x)
                        .attr('y',y+h+4)
                        .attr('height',4)
                        .attr('width',4)
                        .style('cursor','ns-resize')
                        .attr('stroke','red')
                        .attr('stroke-width','4')
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


    saveView(){
      
    }
}
















// .......... custom component for right click menu.............
@Component({
  selector: 'context',
  template: `<ion-list>
  <ion-item button id='res_but' (click)='activateResize()'>Resize</ion-item>
  <ion-item button (click)='move()'>Move</ion-item>
  <ion-item button (click)='remRoom()'>Remove</ion-item>
  <ion-item button *ngIf='user.sel_Element[0].sel_el == "door"' (click)='rotate()'>Rotate</ion-item>
</ion-list>`,
})
export class ContextComponent {
  constructor(public a:HomePage, private user: UserService){}
  resizeRoom = false;
  removeRoom = false;
  rotatedoor = false;
  move_el = false;
  activateResize(){
    this.resizeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom }
    this.a.dismissPopover(ev);
  }
  remRoom(){
    this.removeRoom =true;
    let ev = { resize: this.resizeRoom, remove: this.removeRoom }
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

