import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
import { VariableService } from 'src/app/shared/variable.service';

import data from 'src/app/pages/home/different';
import * as $ from 'jquery';
import * as d3 from 'd3';
import { HomeMaker } from 'src/common/d3lib/homeMaker';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-view-layout',
  templateUrl: './view-layout.component.html',
  styleUrls: ['./view-layout.component.scss']
})

export class ViewLayoutComponent implements OnInit, OnChanges {

  constructor(private variableService: VariableService, private user:UserService) { }
 
  @ViewChild('lv', { static: true }) el: ElementRef;
  serverUrl = this.variableService.serverHost + ":" + this.variableService.serverPort + "/";
  loading;

  
   
  ngOnInit() {
    console.log("initialisation of viewLayout");
    this.variableService.activeRoomId = null;
    this.variableService.showHouse2dIcon = true;
    this.variableService.exitApp = true;
    this.serverUrl = this.variableService.serverHost + ":" + this.variableService.serverPort + "/";
    
    
  }
  ngOnChanges(){
    // this.onHomeSelect()
  // console.log("changed.....................")
  }

   // debugger;
//    triggerDevice(){
//     let env = this;
//     console.log("hgfcdcfgvg");
//     var roomsWithClickProperty = document.querySelectorAll('.attachRoomClickEvent');
//     for (var i = 0; i < roomsWithClickProperty.length; i++) {
//       roomsWithClickProperty[i].addEventListener('click', env.roomClick.bind(env));
//     }
//     // document.getElementById("layoutView").innerHTML = layout;
//     var imagesWithToggleProperty = document.querySelectorAll('.attachToggleEvent');
//     for (var i = 0; i < imagesWithToggleProperty.length; i++) {
//       imagesWithToggleProperty[i].addEventListener('click', env.toggleDeviceStatus.bind(env));
//     }

//   }
//     /* var imagesToBeUpdated = env.el.nativeElement.querySelectorAll('.updateImagePath');
//     for (var i = 0; i < imagesToBeUpdated.length; i++) {
//       let imageName = imagesToBeUpdated[i].getAttribute("xlink:href");
//       imagesToBeUpdated[i].setAttribute("xlink:href", this.serverUrl + imageName);
//     } */


// plotRooms(env){
//   window['d3'] = d3;
//   let that = this;
//   let selector = d3.select("#home-layout");
//   let homeMaker = new HomeMaker(selector, this.user.arraydata);

//   homeMaker.getRooms().forEach(room => {
//     if(room.isActive()){
//       room.$el().on('click', function(e){
//         that.roomClick(d3.event);
//       });
//     }
//   })
//   this.triggerDevice();
//   // console.log(JSON.stringify(that))
// }

// onHomeSelect() {
//   console.log("on Home Select:");
//   this.variableService.showHouse2dIcon = true;
//   console.log("house2ddddddddddddd" + this.variableService.showHouse2dIcon);
//   this.variableService.exitApp = true;
//   let env = this;
//   env.variableService.activeLayoutName = env.variableService.houseName;
//   this.getRoomsAndDeviceInfo();
//   //Plot Rooms
//   this.plotRooms(env);
// // alert(JSON.stringify(env))
// }

// getRoomsAndDeviceInfo() {
//   document.querySelector("#home-layout").classList.remove("display-none");
//   document.querySelector("#rooms-layout").classList.add("display-none");
//   if (this.variableService.activeRoomId != null) {
//     document.querySelector("#"+this.variableService.activeRoomId + "_3d").classList.add("display-none");
//   }
// }

// public roomClick(event) {
//   this.variableService.exitApp = false;
//   let target = event.currentTarget;
//   let roomDisplayId = target.id.split('_')[0];
//   let roomId = this.variableService.allRooms[roomDisplayId].id;
//   let roomName = this.variableService.allRooms[roomDisplayId].name;
//   document.querySelector("#home-layout").classList.add("display-none");
//   document.querySelector("#rooms-layout").classList.remove("display-none");
//   document.querySelector("#"+roomDisplayId + "_3d").classList.remove("display-none");
//   let svg = <HTMLElement>document.querySelector("#"+roomDisplayId + "_3d svg");
//   svg.style.width = '99%';
//   setTimeout(function(){
//     svg.style.width = '100%';
//   },1000);
//   this.variableService.activeLayoutName = roomName;
//   this.variableService.activeRoomId = roomDisplayId;
//   this.setInitialDeviceStatusForRoom();
// }

// public toggleDeviceStatus(event) {
//   let target = event.currentTarget;
//   let displayId = target.id;
//   if(this.variableService.allDevices[displayId] != null) {
//     let deviceInfo = this.variableService.allDevices[displayId];
//     let actualDeviceId = deviceInfo.id;
//     let deviceName = deviceInfo.display_name;
//     let imageName = deviceInfo.image_name;
//     let currentState = deviceInfo.status;
//     let reqStatusAlpha = currentState == "0" ? "ON" : "OFF";
//     // let loading = this.loadingCtrl.create({
//     //   content: deviceName + " is turning " + reqStatusAlpha
//     // });
//     // loading.present();
//     if (currentState == "0") {
//       $(target).addClass('on');
//       this.variableService.allDevices[displayId].status = true;
//       this.turnRotateOnOff(target, 1);
//     } else {
//       $(target).removeClass('on');
//       this.variableService.allDevices[displayId].status = false;
//       this.turnRotateOnOff(target, 0);
//     }
//     // loading.dismiss();
//   }
// }

// public setInitialDeviceStatusForRoom() {
//   // let loading = this.loadingCtrl.create({
//   //   content: "Initialising Devices. Please Wait...."
//   // });
//   // loading.present();
//   for (let key in this.variableService.allDevices) {
//     if(this.variableService.allDevices.hasOwnProperty(key)) {
//       let deviceInfo = this.variableService.allDevices[key];
//       let displayId = key;
//       let imageName = deviceInfo.image_name;
//       if(imageName == null) {
//         imageName = "default"; // get this data from Image server
//       }
//       if(document.querySelector("#"+displayId) != null) {
//         if (deviceInfo.status) {
//           document.querySelector("#"+displayId).classList.add("on");
//         } else {
//           document.querySelector("#"+displayId).classList.remove("on");
//         }
//       }
//     }
//   }
//   // loading.dismiss();
// }


// turnRotateOnOff(target, status) {
//   if(status) {
//     if(target.classList.contains("rotate-off")) {
//       target.classList.remove("rotate-off");
//       target.classList.add("rotate-on");
//     }
//   } else {
//     if (target.classList.contains("rotate-on")) {
//       target.classList.remove("rotate-on");
//       target.classList.add("rotate-off");
//     }
//   }
// }

// showErrorMessage(deviceName, status) {
//   // let toast = this.toastCtrl.create({
//   //   message: deviceName + " could not be turned " +  status,
//   //   duration: 1500,
//   //   position: 'top'
//   // });
//   // toast.present();
//   alert(deviceName + " could not be turned " +  status)
// }

// public homeClick() {
//   this.variableService.exitApp = true;
//   // document.querySelector("#home-layout").classList.remove("display-none");
//   //console.log(document.querySelector("#home-layout"))
//   // document.querySelector("#rooms-layout").classList.add("display-none");
//   if(this.variableService.activeRoomId != null) {
//     document.querySelector("#"+this.variableService.activeRoomId + "_3d").classList.add("display-none");
//     document.querySelector("#home-layout").classList.remove("display-none");
//   }
//   this.variableService.activeLayoutName = this.variableService.houseName;
// }

// showAlert(title, subTitle) {
//   let env = this;
//   // let alert = this.alertCtrl.create({
//   //   title: title,
//   //   subTitle: subTitle,
//   //   buttons: ['Dismiss']
//   // });
//   // alert.present();
//   alert(title + subTitle)
// }
}
