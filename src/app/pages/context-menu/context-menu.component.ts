import { Component, OnInit } from '@angular/core';
//import { HomePage } from 'src/app/home/home.page';
import { UserService } from 'src/app/services/user.service';
import { ResizeRoomComponent } from '../resize-room/resize-room.component';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent implements OnInit {

  constructor( private user: UserService, private resize:ResizeRoomComponent) { }

  ngOnInit() {}
//   @Component({
//     selector: 'context',
//  )
    resizeRoom = false;
    removeRoom = false;
    rotateRooms=false;
    rotatedoor = false;
    move_el = false;
  
    activateResize(){
      this.resizeRoom =true;
      let ev ={ resize: this.resizeRoom, remove: this.removeRoom, rotate:this.rotateRooms}
     // this.a.dismissPopover(ev);
    }
    remRoom(){
      this.removeRoom =true;
      let ev ={ resize: this.resizeRoom, remove: this.removeRoom , rotate:this.rotateRooms}
      //this.a.dismissPopover(ev);
    }
    rotateRoom(){
      //console.log(this);
      this.rotateRooms =true;
     // that.polyAng;
      let ev ={ resize: this.resizeRoom, remove: this.removeRoom , rotate:this.rotateRooms}
     // this.a.dismissPopover(ev);
    }
    rotate(){
      this.rotatedoor = true;
      let ev = { resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
     // this.a.dismissPopover(ev);
    }
    move(){
      this.move_el = true;
      let ev = { move: this.move_el, resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    //  this.a.dismissPopover(ev);
    }
    resizePolyRoom(side){
      //alert("resizing room")
      let ev = { move: this.move_el, resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
     // this.a.dismissPopover(side);
     // this.resize.resizeRoom();
    }
    // resizePolyRoomHeight(){
    //   alert("resizing room")
    //   let ev = { move: this.move_el, resize: this.resizeRoom, remove: this.removeRoom, rotate: this.rotatedoor }
    //   this.a.dismissPopover(ev);
    //  // this.a.resizeRoomHeight();
    // }
  }
  
