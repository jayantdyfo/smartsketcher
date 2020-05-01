import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges } from '@angular/core';
// import data from 'src/app/pages/home/different';
import * as $ from 'jquery';
import * as d3 from 'd3';
import { HomeMaker } from 'src/common/d3lib/homeMaker';
import { VariableService } from '../services/variable.service';
import { UserService } from '../services/user.service';


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
    //this.variableService.activeRoomId = null;
    ////this.variableService.showHouse2dIcon = true;
    //this.variableService.exitApp = true;
    //this.serverUrl = this.variableService.serverHost + ":" + this.variableService.serverPort + "/";
    
    this.user.onHomeSelect();
  }
  ngOnChanges(){
    // this.onHomeSelect()
  // console.log("changed.....................")
  }
}
