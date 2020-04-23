import { Component, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { ViewLayoutComponent } from '../view-layout/view-layout.component';
import * as d3 from 'd3';
import { PopoverController } from '@ionic/angular';
import { drag } from 'd3';
import { DriverProvider } from 'protractor/built/driverProviders';

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
  i=0;
  image;
  x1;
  x2:number; 
  y1;
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

  ngOnInit() {
    // this.drag()
    // this.user.arraydata = JSON.parse(this.user.rapidPageValue);
    // this.showarray = this.user.rapidPageValue;
    var width = 1050;
    var height = 680;
    this.svg = d3.select("#layout")
    .append("svg")
   .attr("width", width)
    .attr("height", height)
    .style('border',"1px solid black").
    style('margin','-7%')
    .append('defs');
    //.append('polygon')
    
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
    document.getElementById('layout').style.cursor = "crosshair";
    window['d3'] = d3;
    var self=this;
    d3.select('#tempImg').remove();
    self.toolname=tool;
      let house = d3.selectAll("svg");
      console.log(house)
      house.raise().style('cursor','cell');
        if(self.toolname=='rectangle'){
          self=this;
            this.getPointerOnSVG();
            house.on('click', (e)=>{ 
              this.createRoom()
              house.style('cursor','crosshair');
              self.toolname='none';
            })
           }
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
      d3.selectAll('svg').
       on('click', 
       function(){
        var x=d3.event.x-82;
        var y=d3.event.y-66;
       self.lshape(x,y)
      })
    }
    if(self.toolname=='U_shape'){
      var self=this;
      //console.log(d3.select('svg'));
      d3.selectAll('svg').
       on('click', 
       //this.pointx1
       function(){
        var x=d3.event.x-82;
        var y=d3.event.y-66;
       self.ushape(x,y)
      })
    }
    if(self.toolname=='T_shape'){
      var self=this;
     
      //console.log(d3.select('svg'));
      d3.selectAll('svg').
       on('click', 
       //this.pointx1
       function(){
        var x=d3.event.x-82;
        var y=d3.event.y-66;
       self.tshape(x,y)
      })
    }
 }
 lshape(x,y){
    var poly=[{"x":x, "y":y},
    {"x":x,"y":y+150},
    {"x":x+150,"y":y+150},
    {"x":x+150,"y":y+120},
    {"x":x+30,"y":y+120}, 
    {"x":x+30,"y":y}];   
//     var xScale = d3.scaleLinear().domain([0,5]).range([25,175]);
// var yScale = d3.scaleLinear().domain([0,5]).range([175,25]);
//     var points = d3.data.map((d) => [xScale(d.x), yScale(d.y)]);
//     var hull = d3.polygonHull(points);            
    d3.selectAll("svg").selectAll('polygon')
    .data([poly])
  .enter().append("polygon")
    .attr("points",function(d) { 
        return d.map(function(d) {
            return [(d.x),(d.y)].join(",");
        }).join(" ");
    }).attr('fill','none').attr('stroke','black').attr('stroke-width',3);
    console.log(d3.selectAll('polygon'))
 }
 ushape(x,y){
   var poly=[{'x':x,'y':y},
              {'x':x,'y':y+150}, 
              {'x':x+200,'y':y+150},
              {'x':x+200,'y':y},
              {'x':x+160,'y':y},
              {'x':x+160,'y':y+120},
              {'x':x+40,'y':y+120},
              {'x':x+40,'y':y}
             ]
  d3.selectAll("svg").selectAll('polygon')
  //   .data([poly])
  // .enter().append("polygon")
  //   .attr("points",function(d) { 
  //       return d.map(function(d) {
  //           return [(d.x),(d.y)].join(",");
  //       }).join(" ");
  //   }).attr('fill','none').attr('stroke','black').attr('stroke-width',3);
   // alert('UUUUUUUUUUUUUUU')
   console.log(d3.selectAll('polygon'))
 }
tshape(x,y){
  var poly=[{'x':x,'y':y},
  {'x':x,'y':y+40}, 
  {'x':x+60,'y':y+40},
  {'x':x+60,'y':y+200},
  {'x':x+100,'y':y+200},
  {'x':x+100,'y':y+40},
  {'x':x+160,'y':y+40},
  {'x':x+160,'y':y}
 ]
  // d3.selectAll("svg").selectAll('polygon')
  //   .data([poly])
  // .enter().append("polygon")
  //   .attr("points",function(d) { 
  //       return d.map(function(d) {
  //           return [(d.x),(d.y)].join(",");
  //       }).join(" ");
  //   }).attr('fill','none').attr('stroke','black').attr('stroke-width',3);

    // //alert('TTTTTTTTTTtt')
    // console.log(d3.selectAll('polygon'))
    
    // d3.selectAll("svg").append('polygon').attr('points', points).attr('fill','none').attr('stroke','black').attr('stroke-width',3);
    var points= function(){
       
    }
    
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
 drag1(ev,path) {
   var self=this;
 let element=ev.currentTarget;
 this.image=path;
 element.classList.add("mystyle");
  let allRect = d3.selectAll('rect').on('click',function(){
  // self.drop(x,y);
  console.log(d3.event)
  d3.select(this).attr('stroke','red');
  var x1=d3.select(this).attr('x');
  var y1=d3.select(this).attr('y')
  var x=d3.event.offsetX-7;
   var y=d3.event.offsetY-7; 
  // alert(x+'     '+y);
   self.drop(x,y)
  })
  
//})
}

drop(x,y) {
let self=this;

this.i=this.i+1
d3.selectAll('svg') .append('image')
       .attr("xlink:href",this.image)
      .attr("x", x)
      .attr("y", y)
      .attr('id',"img"+this.i)
       .attr("width", "6%")
       .attr("height", "6%").classed('dragImg',true)
     d3.selectAll('.dragImg').on('click',this.delete);
     }
     delete(){
       var del=d3.event.target.id
       alert(del);
       d3.select("#"+del).remove();
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
    console.log(e)
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
    translucent: true
  });
  return await popover.present();
}
async dismissPopover(ev) {    
   this.popoverController.dismiss().then(() => { });
}
// ...........menu end......................

createRoom(){
  let that = this;
 const selector = d3.selectAll("svg");
  selector.on('click', null)
  selector.append("rect").
  attr('x', that.x).
  attr('y', that.y).
  attr('width','50').
  attr('height','50').
  attr('stroke','rgb(79, 39, 39)').
  attr('stroke-width','4').
  attr('fill','transparent').
  attr('class','room').style('z-index','0')
  //console.log("sfcydsjk")
//  ...to move element.....................
 let allRect = d3.selectAll('rect');
 //console.log(allRect)
 // allRect.style('cursor', 'move');
//allRect.call(d3.drag().on("start", started))

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
  console.log(''+d+'--' + i);
  that.presentPopover(d)
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
    allRect.style('cursor', 'move');
    allRect.call(d3.drag().on("start", started))
    // d3.event.preventDefault();
    let curEl = d3.select(this)
    // ...........

    // .... To Resize HEIGHT................
    d3.selectAll('svg').append('rect')
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
    d3.selectAll('svg').append('rect')
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

// .... To set floor...........................................
drag(e, fl) {
  // console.log(fl_Img.sl)
  // d3.event.preventDefault()
  let floor = d3.select(e.target).style('border','2px solid blue')
    floor.on('mouseleave', ()=>{floor.raise().style('border','none')})
  // function setFloor() {
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
        //alert("hgcskjcjsk")
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
          console.log("dsuhjjmk")
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
  // }

  let svgEL = d3.selectAll('rect')
  // svgEL.on('mousemove',selectEL)
  // function selectEL(){
  //   let el=d3.select(this).raise().attr('stroke','blue')
  //   el.on('mouseleave',sel_rem)
  // }
  // function sel_rem(){
  //   d3.select(this).raise().attr('stroke','rgb(79, 39, 39)')
  // }
}


}




// .......... custom component for right click menu.............
@Component({
  selector: 'context',
  template: `<ion-list>
  <ion-item button id='res_but' (click)='activateResize()'>Resize</ion-item>
  <ion-item button>Move</ion-item>
  <ion-item button (click)='remRoom()'>Remove</ion-item>
</ion-list>`,
})
export class ContextComponent {
  constructor(public a:HomePage){}
  resizeRoom = false;
  removeRoom = false;
  activateResize(){
    this.resizeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom }
    this.a.dismissPopover(ev);
  }
  remRoom(){
    this.removeRoom =true;
    let ev ={ resize: this.resizeRoom, remove: this.removeRoom }
    this.a.dismissPopover(ev);
  }
}
