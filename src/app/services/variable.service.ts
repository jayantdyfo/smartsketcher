import { Injectable } from '@angular/core';
// import data from '../pages/home/different';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VariableService {

  

  constructor(
    // private user:UserService
    ) { }
  // private messageSource = new BehaviorSubject(data);
  // currentMessage = this.messageSource.asObservable();

  // changeMessage(message) {
  //   this.messageSource.next(message)
  // }

  activeLayoutName: string;
  showHouse2dIcon: boolean = true;
  exitApp: boolean = true;
  // loader = this.loadingCtrl.create({
  //   content: "Initializing. Please Wait...",
  //   dismissOnPageChange: true
  // });

  //Login Page
  loggedIn:boolean = false;

  // HomeView Page Variables
  activeRoomId: string;
  
  // SecurityPage Variables
  allSecurityDevices: Array<{
    deviceName: string,
    deviceId: number,
    roomName: string,
    image: string,
    state: number
  }>;

  // viewLayout Variables
  public allDevices = {
    "d-1-1": {
      "display_id": "d-1-1",
      "id": 12,
      "image_name": "socket",
      "display_name": "Cooler",
      "status": false
    },
    "d-1-2": {
      "display_id": "d-1-2",
      "id": 13,
      "image_name": "socket",
      "display_name": "TV",
      "status": true
    },
    "d-1-4": {
      "display_id": "d-1-4",
      "id": 15,
      "image_name": "fan",
      "display_name": "Fan",
      "status": false
    },
    "d-1-5": {
      "display_id": "d-1-5",
      "id": 16,
      "image_name": "tubelight-up",
      "display_name": "TubeLight",
      "status": false
    },
    "d-1-6": {
      "display_id": "d-1-6",
      "id": 17,
      "image_name": "socket",
      "display_name": "Power",
      "status": false
    },
    "d-1-7": {
      "display_id": "d-1-7",
      "id": 18,
      "image_name": "wall-lamp",
      "display_name": "Lamp",
      "status": false
    },
    "d-1-8": {
      "display_id": "d-1-8",
      "id": 12,
      "image_name": "socket",
      "display_name": "Cooler",
      "status": false
    },
    "d-1-9": {
      "display_id": "d-1-9",
      "id": 12,
      "image_name": "socket",
      "display_name": "Cooler",
      "status": false
    },
    "d-1-10": {
      "display_id": "d-1-10",
      "id": 12,
      "image_name": "socket",
      "display_name": "Cooler",
      "status": false
    },
    "d-2-1": {
      "display_id": "d-2-1",
      "id": 33,
      "image_name": "wall-lamp",
      "display_name": "Lamp Light",
      "status": false
    },
    "d-2-2": {
      "display_id": "d-2-2",
      "id": 34,
      "image_name": "rotor",
      "display_name": "Fan",
      "status": true
    },
    "d-2-3": {
      "display_id": "d-2-3",
      "id": 35,
      "image_name": "tubelight-up",
      "display_name": "Tube Light",
      "status": false
    },
    "d-2-4": {
      "display_id": "d-2-4",
      "id": 36,
      "image_name": "socket",
      "display_name": "Board Switch",
      "status": false
    },
    "d-2-5": {
      "display_id": "d-2-5",
      "id": 31,
      "image_name": "socket",
      "display_name": "Board Switch",
      "status": false
    },
    "d-2-6": {
      "display_id": "d-2-6",
      "id": 32,
      "image_name": "default",
      "display_name": "Cooler",
      "status": false
    },
    "d-3-1": {
      "display_id": "d-3-1",
      "id": 37,
      "image_name": "tubelight-up",
      "display_name": "TubeLight",
      "status": false
    },
    "d-3-2": {
      "display_id": "d-3-2",
      "id": 38,
      "image_name": "fan",
      "display_name": "Fan",
      "status": false
    },
    "d-3-3": {
      "display_id": "d-3-3",
      "id": 39,
      "image_name": "light-bulb",
      "display_name": "Lamp",
      "status": false
    },
    "d-3-4": {
      "display_id": "d-3-4",
      "id": 40,
      "image_name": "socket",
      "display_name": "Air Conditioner",
      "status": false
    },
    "d-3-5": {
      "display_id": "d-3-5",
      "id": 41,
      "image_name": "socket",
      "display_name": "Cooler",
      "status": false
    },
    "d-3-6": {
      "display_id": "d-3-6",
      "id": 42,
      "image_name": "socket",
      "display_name": "Power",
      "status": false
    },
    "d-4-1": {
      "display_id": "d-4-1",
      "id": 48,
      "image_name": "fan",
      "display_name": "Fan 1",
      "status": false
    },
    "d-4-2": {
      "display_id": "d-4-2",
      "id": 49,
      "image_name": "socket",
      "display_name": "Switch",
      "status": false
    },
    "d-4-3": {
      "display_id": "d-4-3",
      "id": 50,
      "image_name": "fan",
      "display_name": "Fan 2",
      "status": false
    },
    "d-4-4": {
      "display_id": "d-4-4",
      "id": 51,
      "image_name": "wall-lamp",
      "display_name": "Light 2",
      "status": false
    },
    "d-4-5": {
      "display_id": "d-4-5",
      "id": 52,
      "image_name": "chandelier",
      "display_name": "Chandelier",
      "status": false
    },
    "d-4-6": {
      "display_id": "d-4-6",
      "id": 53,
      "image_name": "wall-lamp",
      "display_name": "Light 1",
      "status": false
    },
    "d-4-7": {
      "display_id": "d-4-7",
      "id": 53,
      "image_name": "wall-lamp",
      "display_name": "Light 3",
      "status": false
    },
    "d-4-8": {
      "display_id": "d-4-8",
      "id": 53,
      "image_name": "wall-lamp",
      "display_name": "Light 4",
      "status": false
    },
    "d-4-9": {
      "display_id": "d-4-9",
      "id": 49,
      "image_name": "socket",
      "display_name": "Switch",
      "status": false
    },
    "d-5-2": {
      "display_id": "d-5-2",
      "id": 63,
      "image_name": "tubelight-up",
      "display_name": "TubeLight",
      "status": true
    },
    "d-5-3": {
      "display_id": "d-5-3",
      "id": 64,
      "image_name": "fan",
      "display_name": "fan",
      "status": false
    },
    "d-5-4": {
      "display_id": "d-5-4",
      "id": 65,
      "image_name": "wall-lamp",
      "display_name": "Lamp Light",
      "status": false
    },
    "d-5-5": {
      "display_id": "d-5-5",
      "id": 66,
      "image_name": "default",
      "display_name": "Exhaust",
      "status": true
    },
    "d-5-6": {
      "display_id": "d-5-6",
      "id": 67,
      "image_name": "socket",
      "display_name": "Switch",
      "status": false
    },
    "d-6-1": {
      "display_id": "d-6-1",
      "id": 68,
      "image_name": "default",
      "display_name": "Test Device 1",
      "status": false
    },
    "d-6-2": {
      "display_id": "d-6-2",
      "id": 69,
      "image_name": "default",
      "display_name": "Test Device 2",
      "status": false
    },
    "d-6-3": {
      "display_id": "d-6-3",
      "id": 70,
      "image_name": "default",
      "display_name": "Test Device 3",
      "status": false
    },
    "d-6-4": {
      "display_id": "d-6-4",
      "id": 71,
      "image_name": "default",
      "display_name": "Test Device",
      "status": false
    }
  };
  public allRooms = {
    "r-1": {
      "display_id": "r-1",
      "id": 7,
      "name": "Kids Room"
    },
    "r-2": {
      "display_id": "r-2",
      "id": 8,
      "name": "VishalRoom"
    },
    "r-3": {
      "display_id": "r-3",
      "id": 9,
      "name": "YashRoom"
    },
    "r-4": {
      "display_id": "r-4",
      "id": 12,
      "name": "Living Room"
    },
    "r-5": {
      "display_id": "r-5",
      "id": 16,
      "name": "Kitchen"
    },
    "r-6": {
      "display_id": "r-6",
      "id": 17,
      "name": "TestRoom"
    },
    "r-7": {
      "display_id": "r-1",
      "id": 7,
      "name": "Kids Room"
    },
    "r-8": {
      "display_id": "r-2",
      "id": 8,
      "name": "VishalRoom"
    },
    "r-9": {
      "display_id": "r-3",
      "id": 9,
      "name": "YashRoom"
    },
    "r-10": {
      "display_id": "r-4",
      "id": 12,
      "name": "Living Room"
    },
    "r-11": {
      "display_id": "r-5",
      "id": 16,
      "name": "Kitchen"
    },
    "r-12": {
      "display_id": "r-5",
      "id": 17,
      "name": "gallery"
    },
    "r-13": {
      "display_id": "r-5",
      "id": 18,
      "name": "Office Room"
    },
    "r-14": {
      "display_id": "r-5",
      "id": 19,
      "name": "Office Room"
    },
    "r-15": {
      "display_id": "r-5",
      "id": 20,
      "name": "Office Room"
    },
    "r-16": {
      "display_id": "r-5",
      "id": 21,
      "name": "Office Room"
    },
    "r-17": {
      "display_id": "r-5",
      "id": 22,
      "name": "Office Room"
    },
    "r-18": {
      "display_id": "r-5",
      "id": 23,
      "name": "Office Room"
    }
  };
  public houseId: number = 3;
  public houseName: string = "Test House";


  //Scheduler Page Variables
  scheduledDevices: Array<{
    deviceName: string,
    startTime: string,
    endTime: string,
    deviceId: number,
    roomName: string,
    image: string,
    schedulerId: number,
    isRepeatable: boolean,
    startDate: string,
    endDate: string,
    hasEndTime: boolean,
    startDateTime: string,
    endDateTime: string,
  }>;

  schedulingDevices: Array<{
    deviceName: string,
    deviceId: number,
    roomName: string,
    image: string
  }>;

  public schedulerCardInfo = {
    timeStarts: '07:43',
    timeEnds: '08:45',
    hasEndTime: false,
    deviceName: null,
    isRepeatable: false,
    deviceId: null,
    state: false,
    schedulerId: null,
    roomName: ''
  };

  showSchedulerCard: Boolean = false;
  showAllDevices: Boolean = false;
  showScheduledDevices: Boolean = true;
  showAddIcon: Boolean = true;
  schedulingNewDevice: Boolean = true;

  //ModePage Variables
  mode_type: string = 'night';

  allNightModeDevices: Array<{
    deviceName: string,
    deviceId: number,
    roomName: string,
    image: string,
    state: number
  }>;

  allPowerModeDevices: Array<{
    deviceName: string,
    deviceId: number,
    roomName: string,
    image: string,
    state: number
  }>;

  allModes: Array<{
    modeId: number,
    modeName: string,
    type: string
  }>;

  //Server Variables
  serverHost =  "https://rubix.prod.dyfolabs.com";
  serverPort = "13000";


getdata(arraydata){
  return arraydata;
}
setdata(){
  // let setdetail=this.getdata(arraydata);
}



}
