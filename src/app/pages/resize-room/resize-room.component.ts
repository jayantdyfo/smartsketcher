import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import * as d3 from 'd3';
import { HomePage } from 'src/app/home/home.page';
//import { PopAndOtherService } from 'src/app/services/pop-and-other.service';

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



 
