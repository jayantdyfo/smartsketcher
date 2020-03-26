import { Plotter } from './basePlotter';
import { Room } from './homeEntities/room';
import Victor from 'victor';
export class HomeMaker{
  private selector;
  private rooms: Array<Room> = [];
  private data;

  constructor(selector, data?){
    this.setData(data);
    this.setSelector(selector);
    let addedSVG = this.getSelector().append('svg')
      .attr('id', 'home-blue-print')
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('version', '1.1')
      .attr('viewBox', '0 0 100 100')
      .attr('width','100%')
      .attr('height','100%')
      .attr('xmlns', 'http://www.w3.org/2000/svg');
    this.setSelector(addedSVG);
    if(data !== undefined){
      data.rooms.forEach(room => {
        this.addRoom(room)
      });
    }
    this.addDoors(data.doors);
    this.addEntrance(data.entrance);
  }

  getSelector(){
    return this.selector;
  }
  setSelector(selector){
    this.selector = selector;
  }

  getData(){
    return this.data;
  }
  setData(data){
    this.data = data;
  }

  getRooms(){
    return this.rooms;
  }

  addRoom(room: RoomData): Room{
    let addedRoom = new Room(room, this.getSelector());
    addedRoom.setDoors(this.getDoorsForRoom(this.getData().doors, room));
    addedRoom.initialize();
    this.rooms.push(addedRoom);
    return addedRoom;
  }

  addDoors(doors){
    doors.forEach((door, index) => {
      this.getSelector().append('line')
      .attr('x1', door.origin.x)
      .attr('y1', door.origin.y)
      .attr('x2', door.origin.x + door.length)
      .attr('y2', door.origin.y)
      .attr('style', `transform-origin: ${door.origin.x}px ${door.origin.y}px;
        transform: rotate(${door.orientation}deg);
        stroke: ${door.color !== undefined ? door.color : '#fff'};
        `)
      .classed('door', true);
    });
  }

  addEntrance(entrance: Entrance){
    let entranceText = this.getSelector().append('text')
      .attr('x', entrance.x)
      .attr('y', entrance.y)
      .attr('textLength', entrance.length)
      .attr('lengthAdjust', 'spacing')
      .classed('entranceText', true)
      .text('Entrance');

    if(entrance.orientation === 90){
      entranceText.attr('transform','rotate(-90, ' + entrance.x + ',' + entrance.y + ')')
    }
  }

  private getDoorsForRoom(doors: Door[], room: RoomData): Door[][]{
    let doorsForRoom: Door[][] = [];
    let roomPolygon = room.coordinates.type === 'rect' ? Plotter.rectToPolygon(room.coordinates) : Plotter.getPointsFromString(room.coordinates.points);
    let noOfVertices = roomPolygon.length;
    for (let i = 0; i < noOfVertices; i++) {
      let next = (i + 1) % noOfVertices;

      const p0 = roomPolygon[i];
      const pn = roomPolygon[next];

      let v0 = new Victor(p0.x, p0.y);
      let vn = new Victor(pn.x, pn.y);

      let v_this = vn.clone().subtract(v0);
      doorsForRoom.push([]);

      doors.forEach(door => {
        let vd = new Victor(door.origin.x, door.origin.y);
        let vd_norm = vd.clone().subtract(v0);
        if((v_this.angle() === vd_norm.angle()) && (v_this.magnitude() >= vd_norm.magnitude())) {
          doorsForRoom[i].push(door);
        }
      });
    }
    return doorsForRoom;
  }
}
