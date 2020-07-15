import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as d3 from 'd3';
import { HomePage } from 'src/app/home/home.page';

@Component({
  selector: 'app-resize-room',
  templateUrl: './resize-room.component.html',
  styleUrls: ['./resize-room.component.scss'],
})
export class ResizeRoomComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {}
  x;y;
  index=0;
  resizeRoom(){
   // alert(side)
    var Id=this.user.roomId;
    var roomId=Id.substring(0,Id.length-1);
    let svg=d3.select('svg')
   //d3.mouse(this); 
   let that=this;
   //let points= this.user.points;
  // let room=d3.selectAll("#"+roomId).attr('points')
  // console.log(room)
  //console.log(room[0])
  var Id=this.user.roomId;
  var roomId=Id.substring(0,Id.length-1)
  console.log(roomId)
  console.log(Id.includes('L'))
  console.log(Id.includes('U'))
  console.log(Id.includes('T'))
  let angle=d3.selectAll("#"+roomId).attr('class');
  console.log(angle)
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
    let x=parseInt(pointx);
    let y=parseInt(pointy);
    let i=1;
    let j=1;
    let w=i++;
    let h=j++;
    let increWidth=w*5;
    let increHeight=h*5;
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
      }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room').call(movePoly);
      let that=this;
      d3.selectAll('polygon').on('contextmenu', function(d,i){
        that.user.roomId=d3.event.target.id+'L'
        d3.event.preventDefault();
        console.log(that.user.roomId+'L');
        //that.a.presentPopover(d)
      })
  }
  if(setAngle==90)
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
    d3.selectAll("svg").selectAll('polygon'+' '+'#'+'r-'+this.index+'_1d')
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
        //that.a.presentPopover(d)
      })
  }
  if(setAngle==180)
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
      }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room').call(movePoly);
      let that=this;
      d3.selectAll('polygon').on('contextmenu', function(d,i){
        that.user.roomId=d3.event.target.id+'L'
        d3.event.preventDefault();
        console.log(that.user.roomId+'L');
        //that.a.presentPopover(d)
      })
  }
  if(setAngle==270)
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
      }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
      let that=this;
      d3.selectAll('polygon').on('contextmenu', function(d,i){
        that.user.roomId=d3.event.target.id+'L'
        d3.event.preventDefault();
        console.log(that.user.roomId+'L');
        //that.a.presentPopover(d)
      })
    }
  }
if(Id.includes('U')==true){
if(setAngle==0){
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
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room').call(movePoly);
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
that.user.roomId=d3.event.target.id+"U"
d3.event.preventDefault();
console.log(that.user.roomId+'U');
//that.a.presentPopover(d)
})
}
if(setAngle==90){
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
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room').call(movePoly);
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
that.user.roomId=d3.event.target.id+"U"
d3.event.preventDefault();
console.log(that.user.roomId+'U');
//that.a.presentPopover(d)
})
}
if(setAngle==180){
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
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room').call(movePoly);
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
that.user.roomId=d3.event.target.id+"U"
d3.event.preventDefault();
console.log(that.user.roomId+'U');
//that.a.presentPopover(d)
})
}
if(setAngle==270){
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
}).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
that.user.roomId=d3.event.target.id+"U"
d3.event.preventDefault();
console.log(that.user.roomId+'U');
//that.a.presentPopover(d)
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
  }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','90 room').call(movePoly);
  let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
that.user.roomId=d3.event.target.id+"T"
d3.event.preventDefault();
console.log(that.user.roomId+'T');
//that.a.presentPopover(d)
})
}
if(setAngle==90){
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
    }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','180 room').call(movePoly);
    let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"T"
  d3.event.preventDefault();
  console.log(that.user.roomId+'T');
  //that.a.presentPopover(d)
})
}
if(setAngle==180){
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
    }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','270 room').call(movePoly);
    let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"T"
  d3.event.preventDefault();
  console.log(that.user.roomId+'T');
  //that.a.presentPopover(d)
})
}
if(setAngle==270){
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
    }).attr('id',roomId).attr('fill','none').attr('stroke','black').attr('stroke-width',1).attr('class','0 room').call(movePoly);
    let that=this;
d3.selectAll('polygon').on('contextmenu', function(d,i){
  that.user.roomId=d3.event.target.id+"T"
  d3.event.preventDefault();
  console.log(that.user.roomId+'T')
 //that.a.presentPopover(d)
})
}
}
let h=d3.select("#"+roomId)

  }
}

//   async presentPopover(ev: any) {
//     const popover = await this.popoverController.create({
//       component: ContextComponent,
//       event: ev,
//       translucent: true,
//     });
//     return await popover.present();
//   }
// }



 
