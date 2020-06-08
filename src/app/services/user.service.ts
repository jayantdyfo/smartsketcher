import { Injectable, OnInit, Input, AfterContentChecked,  } from '@angular/core';
import { VariableService } from './variable.service';
// import data from '../pages/home/different';
import { HomeMaker } from 'src/common/d3lib/homeMaker';
import * as $ from 'jquery';
import * as d3 from 'd3';
// import { NgxPrettifyService } from '@smartcodelab/ngx-prettify';
@Injectable({
  providedIn: 'root'
})
export class UserService implements  AfterContentChecked {

  @Input() arraydata;
  constructor(private variableService: VariableService,
    // public prettifier: NgxPrettifyService
    ) { }

  webServerHost = this.variableService.serverHost + ":" + this.variableService.serverPort;

  // grouping variables
  groupingview = false;
  showhtml = false;
  groupingdone = false;
  clonedhtml;
  clonedlayout;
  circlehtml;
  count = 0;
  g_id;
  sel_group = [];
  sel3D = [];
  roomId;
  //sel_Element;
  public sel_Element=[{sel_id:'0',sel_el:'none'}]
  ngAfterContentChecked() {
  // this.cd.detectChanges();
  }

  // get rapidPageValue() {
  //   return JSON.stringify(data, null, 2);
  // }

  set rapidPageValue(v) {
  try {
    this.arraydata = JSON.parse(v);
    this.onHomeSelect();
  // console.log("hiiiiiiiiiiiiiiiiii"+ JSON.stringify(this.arraydata))
     } catch (e) {
      console.log('error occured while you were typing the JSON');
    }
  }

  triggerDevice() {
    let env = this;
    var roomsWithClickProperty = document.querySelectorAll('.attachRoomClickEvent');
    for (var i = 0; i < roomsWithClickProperty.length; i++) {
      roomsWithClickProperty[i].addEventListener('click', env.roomClick.bind(env));
    }
    // document.getElementById("layoutView").innerHTML = layout;
    var imagesWithToggleProperty = document.querySelectorAll('.attachToggleEvent');
    for (var i = 0; i < imagesWithToggleProperty.length; i++) {
      imagesWithToggleProperty[i].addEventListener('click', env.toggleDeviceStatus.bind(env));
    }
  }

  plotRooms(env) {
    window['d3'] = d3;
    let that = this;
    let selector = d3.select("#home-layout");
    let homeMaker = new HomeMaker(selector, this.arraydata);

    homeMaker.getRooms().forEach(room => {
      if(room.isActive()) {
        room.$el().on('click', function(e) {
          that.roomClick(d3.event);
        });
      }
    })
    this.triggerDevice();
    // console.log(JSON.stringify(this.arraydata))
  }
  
  onHomeSelect() {
    console.log("on Home Select:");
    // console.log("haaaaaaaaaaaaaaaaaaaaaa"+JSON.stringify(this.arraydata))
    this.variableService.showHouse2dIcon = true;
    // console.log("house2ddddddddddddd" + this.variableService.showHouse2dIcon);
    this.variableService.exitApp = true;
    let env = this;
    env.variableService.activeLayoutName = env.variableService.houseName;
    this.getRoomsAndDeviceInfo();
    document.querySelector("#home-layout").innerHTML="";
    document.querySelector("#rooms-layout").innerHTML="";
    //Plot Rooms
    this.plotRooms(env);
  // alert(JSON.stringify(env))

  }

  getRoomsAndDeviceInfo() {
    document.querySelector("#home-layout").classList.remove("display-none");
    document.querySelector("#rooms-layout").classList.add("display-none");
    if (this.variableService.activeRoomId != null) {
      document.querySelector("#"+this.variableService.activeRoomId + "_3d").classList.add("display-none");
    }
  }

  public roomClick(event) {
    this.variableService.exitApp = false;
    let target = event.currentTarget;
    let roomDisplayId = target.id.split('_')[0];
    let roomId = this.variableService.allRooms[roomDisplayId].id;
    let roomName = this.variableService.allRooms[roomDisplayId].name;
    document.querySelector("#home-layout").classList.add("display-none");
    document.querySelector("#rooms-layout").classList.remove("display-none");
    document.querySelector("#"+roomDisplayId + "_3d").classList.remove("display-none");
    let svg = <HTMLElement>document.querySelector("#"+roomDisplayId + "_3d svg");
    svg.style.width = '99%';
    setTimeout(function() {
      svg.style.width = '100%';
    }, 1000);
    this.variableService.activeLayoutName = roomName;
    this.variableService.activeRoomId = roomDisplayId;
    this.setInitialDeviceStatusForRoom();
  }

  public toggleDeviceStatus(event) {
    let target = event.currentTarget;
    let displayId = target.id;
    if(this.variableService.allDevices[displayId] != null) {
      let deviceInfo = this.variableService.allDevices[displayId];
      let actualDeviceId = deviceInfo.id;
      let deviceName = deviceInfo.display_name;
      let imageName = deviceInfo.image_name;
      let currentState = deviceInfo.status;
      let reqStatusAlpha = currentState == "0" ? "ON" : "OFF";
      // let loading = this.loadingCtrl.create({
      //   content: deviceName + " is turning " + reqStatusAlpha
      // });
      // loading.present();
      
      if (currentState == "0") {
        $(target).addClass('on');
        this.variableService.allDevices[displayId].status = true;
        this.turnRotateOnOff(target, 1);
      } else {
        $(target).removeClass('on');
        this.variableService.allDevices[displayId].status = false;
        this.turnRotateOnOff(target, 0);
      }
      // loading.dismiss();
    }
  }
  
  public setInitialDeviceStatusForRoom() {
    // let loading = this.loadingCtrl.create({
    //   content: "Initialising Devices. Please Wait...."
    // });
    // loading.present();
    for (let key in this.variableService.allDevices) {
      if(this.variableService.allDevices.hasOwnProperty(key)) {
        let deviceInfo = this.variableService.allDevices[key];
        let displayId = key;
        let imageName = deviceInfo.image_name;
        if(imageName == null) {
          imageName = "default"; // get this data from Image server
        }
        if(document.querySelector("#"+displayId) != null) {
          if (deviceInfo.status) {
            document.querySelector("#"+displayId).classList.add("on");
          } else {
            document.querySelector("#"+displayId).classList.remove("on");
          }
        }
      }
    }
    // loading.dismiss();
  }
  
  
  turnRotateOnOff(target, status) {
    if(status) {
      if(target.classList.contains("rotate-off")) {
        target.classList.remove("rotate-off");
        target.classList.add("rotate-on");
      }
    } else {
      if (target.classList.contains("rotate-on")) {
        target.classList.remove("rotate-on");
        target.classList.add("rotate-off");
      }
    }
  }
  
  showErrorMessage(deviceName, status) {
    // let toast = this.toastCtrl.create({
    //   message: deviceName + " could not be turned " +  status,
    //   duration: 1500,
    //   position: 'top'
    // });
    // toast.present();
    alert(deviceName + " could not be turned " +  status)
  }
  
  public homeClick() {
    this.variableService.exitApp = true;
    // document.querySelector("#home-layout").classList.remove("display-none");
    //console.log(document.querySelector("#home-layout"))
    // document.querySelector("#rooms-layout").classList.add("display-none");
    if(this.variableService.activeRoomId != null) {
      document.querySelector("#"+this.variableService.activeRoomId + "_3d").classList.add("display-none");
      document.querySelector("#home-layout").classList.remove("display-none");
    }
    this.variableService.activeLayoutName = this.variableService.houseName;
  }
  
  showAlert(title, subTitle) {
    let env = this;
    // let alert = this.alertCtrl.create({
    //   title: title,
    //   subTitle: subTitle,
    //   buttons: ['Dismiss']
    // });
    // alert.present();
    alert(title + subTitle);
  }
  pass(x,y){
    alert(x + "   " + y )
  }

  grouping(this) {
    let self = this;
    
    // let selected = [];
    let group_html;
    
    self.circlehtml = $('#layoutView').clone();
    this.clonedlayout = $('#layoutView').clone();
    // this.clonedhtml = $(this.clonedlayout).find('.device-numbers').map(function() {
    //   return this;
    //        }).get();
    // this.clonedhtml = 
    // this.clonedhtml = $(this.clonedhtml).html()
    $(this.clonedlayout).appendTo('.device-view');
    $('.grpbtn').css('display', 'none');
    $('circle').click(function() {
      // let selectcount = self.count;
      // console.log(selectcount);
      let id = $(this).attr('id');
      let color = $(this).css('fill');

// condition if device is not selected / *note= css() always returns rgb value
      if (color == 'rgb(61, 243, 50)') {
        $(this).css('fill', 'yellow');
        self.g_id = id;
        self.sel_group.push(id);
        self.sel3D.push(id.substr(3))
        alert(id + ' selected' + self.sel_group.length + self.sel_group + ' + ' + self.sel3D) ;
        // self.changegrouped(selectcount, id, circlehtml);

        if (self.sel_group.length >= 2) {
          $('.grpbtn').css('display', 'block');
          // $(circlehtml).find("#" + id).appendTo('g')
        }
      } else
      // condition if device is selected / *note= css() always returns rgb value
      if ($(this).css('fill') == 'rgb(255, 255, 0)') {
        $(this).css('fill', 'rgb(61, 243, 50)');
        // selectcount--;
        self.sel_group.splice($.inArray(id, self.sel_group), 1);
        self.sel3D.splice($.inArray(id.substr(3), self.sel3D), 1);
        // condion to hide button
        if (self.sel_group.length < 2) {
          $('.grpbtn').css('display', 'none');
        }
        // ...

        alert(id + 'selected' + self.sel_group.length + self.sel_group) ;
      }
      // ............
      // self.sel_group = [...selected].sort();
      self.sel_group.sort();
      self.sel3D.sort();
   });
  }

  changegrouped() {
    let preId = '';
    let id;
    let newg;
    let newg3d;
    let arr = [];
    let ele3d = [];
    if (preId == '') {
     id = this.sel_group[0];
     newg = $('<g class="display-none" id="' + id + '"></g>');
     newg3d = $('<g class="group" id="' + this.sel3D[0] + '"></g>');
     for(let i=0;i<this.sel_group.length;i++) {
      //  console.log($(this.circlehtml).find("#" + this.sel_group[i]));
       arr.push($(this.circlehtml).find("#" + this.sel_group[i]).clone());
       ele3d.push($(this.circlehtml).find("#" + this.sel3D[i]).clone());
       if (!(this.sel_group[i] == this.sel_group[0])) {
        $(this.circlehtml).find('circle[id="' + this.sel_group[i] + '"]').remove();
        $(this.circlehtml).find('rect[id="' + this.sel3D[i] + '"]').remove();
        }
       $(newg).append(arr);
       $(newg3d).append(ele3d);
      }
    }

    $(this.circlehtml).find("#" + id).wrap(newg);
    $(this.circlehtml).find("#" + this.sel3D[0]).wrap(newg3d);
    $(this.circlehtml).find('circle[id="' + this.sel_group[0] + '"]').empty();
    $(this.circlehtml).find('rect[id="' + this.sel3D[0] + '"]').empty();
    for (let i of this.sel_group) {
     $(this.circlehtml).find('circle[id="' + i + '"]').removeAttr('class');
     $(this.circlehtml).find('circle[id="' + i + '"]').removeAttr('id');
     $(this.circlehtml).find('rect[id="' + i.substr(3) + '"]').addClass('inGroup');
     $(this.circlehtml).find('rect[id="' + i.substr(3) + '"]').removeAttr('id');
     }
    this.clonedhtml = this.circlehtml ;
    this.clonedhtml = $(this.clonedhtml).html() ;
    // console.log(cloned_html);
  }

  groupit() {
    this.groupingdone = true;
    this.changegrouped();
    this.count = 0;
    $('.grpbtn').css('display', 'none');
    this.sel_group = [];
    this.sel3D = [];
  }

  // gethtml() {
  //   let preidset = [];
  //   let newidset = [];
  //   let newidset3d = [];
  //   if (this.groupingdone) {
  //     $(this.circlehtml).find('#device-numbers').children().each(function() {
  //       preidset.push($(this).attr('id'));
  //     });
  //     // console.log(preidset);
  //     let previd = 'dn-d-1-0';
  //     for (let i of preidset) {
  //       let preroom = previd.substr(5).substr(0, previd.substr(5).indexOf('-'));
  //       let predevice = previd.substr(5).substr(previd.substr(5).indexOf('-') + 1);
  //       let newid = i;
  //       let newroom = newid.substr(5).substr(0, newid.substr(5).indexOf('-'));
  //       let newdevice = newid.substr(5).substr(newid.substr(5).indexOf('-') + 1);
  //       // alert(previd + preroom + predevice +'___'+ newid + newroom + newdevice);
  //       if (preroom == newroom) {
  //         let parseVar = parseInt(predevice) + 1;
  //         // console.log(parseVar);
  //         newidset.push(newid.substr(0, 5) + newroom + '-' + (parseVar));
  //         let id3dstr = newid.substr(0, 5) + newroom + '-' + (parseVar);
  //         newidset3d.push(id3dstr.substr(3));
  //         newid = (newid.substr(0, 5) + newroom + '-' + (parseVar));
  //         previd = (newid.substr(0, 5) + newroom + '-' + (parseVar));
  //       } else {
  //         newidset.push(newid);
  //         newidset3d.push(newid.substr(3));
  //         newid = i;
  //         previd = i;
  //       }
  //       // previd = newid;
  //     }
  //     // reset id in 2d.........................................
  //     $(this.circlehtml).find('#device-numbers').children().each(function(i) {
  //       $(this).attr('id', newidset[i]);
  //       // console.log(i);
  //     });
  //     // reset id in 3d .......................
  //     $(this.circlehtml).find('.device-images').children().each(function(i) {
  //       $(this).attr('id', newidset3d[i]);
  //       // console.log(i);
  //     });
  //   }
  //   $('<g/>', { id: 'device-numbers' }).appendTo($(this.circlehtml)
  //   .find('#home-blue-print')).append($(this.circlehtml).find('.device-numbers'));
  //   $(this.circlehtml).find('.device-numbers').contents().unwrap();
  //   // let rmid = $(this.circlehtml).find('#device-numbers');
  //   $(this.circlehtml).find('#device-numbers').slice(1).remove();
  //   $(this.circlehtml).find('.fan').attr('height', 20);
  //   $(this.circlehtml).find('.fan').attr('width', 20);
  //   $(this.circlehtml).find('.fan').removeClass('on');
  //   let gethtmlcode = '<div id="layoutView">' + $(this.circlehtml).html() + '</div>';
  //   gethtmlcode = this.prettifier.prettify(gethtmlcode);
  //   return gethtmlcode.toString();
  // }
// getchangedhtml() {
//   // console.log(this.getcodebyclass())
//  let changed = this.gethtml().replace(/assets\/img\//g, '');
//  changed = changed.replace(/class="door"/g, '');
//  changed = changed.replace(/_ngcontent-csv-c9=""/g, '');
//  changed = changed.replace(/class="outer-polygon"/g, 'class="outer-polygon" style="fill: #000; stroke: #666; stroke-width: 4%;"');
//  changed = changed.replace(/class="room-blue-print"/g, 'class="room-blue-print" style="padding: 2%"');
//  changed = changed.replace(/class="dining-set"/g, 'class="dining-set" width="40" height="40"');
//  changed = changed.replace(/class="sofa-2seat"/g, 'class="sofa-2seat" width="40" height="35"');
//  changed = changed.replace(/class="sofa-1seat"/g, 'class="sofa-1seat" width="25" height="25"');
//  changed = changed.replace(/class="table"/g, 'class="table" width="30" height="25"');
//  changed = changed.replace(/class="bed"/g, 'class="bed" width="50" height="50"');
// //  changed = changed.replace(/class="fan attachToggleEvent inGroup"/g, 'class="fan attachToggleEvent inGroup" width="20" height="20"');
//  return changed;
// }

}
