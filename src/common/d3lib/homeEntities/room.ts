import { Plotter } from './../basePlotter';
import * as d3 from 'd3';
// import * as _ from 'underscore';
import { RoomHelper } from './roomHelper';
import CONFIG from '../devicesConfig';
import Victor from 'victor';

export class Room{

  private selector;
  private selector3D;
  private SVGGroup;
  private data;
  private label;
  private doors: Door[][];
  private _roomSVGContainer;
  private _room3DContainer;
  private roomHelper: RoomHelper;

  constructor(room: RoomData, selector){
    this.roomHelper = new RoomHelper(room);
    this.setSelector(selector);
    this.setData(room);
    this.setSelector3D(d3.select('#rooms-layout'));
  }

  initialize() {
    this.addRoom2D(this.getData());
  }

  getSelector(){
    return this.selector;
  }
  setSelector(selector){
    this.selector = selector;
  }

  getSelector3D(){
    return this.selector3D;
  }
  setSelector3D(selector){
    this.selector3D = selector;
  }

  getSVGGroup(){
    return this.SVGGroup;
  }
  setSVGGroup(svgGroup){
    this.SVGGroup = svgGroup;
  }

  getData(): RoomData{
    return this.data;
  }
  setData(data: RoomData){
    this.data = data;
  }

  getDoors(): Door[][]{
    return this.doors;
  }

  setDoors(doors: Door[][]) {
    this.doors = doors;
  }

  get roomSVGContainer(){
    return this._roomSVGContainer;
  }

  set roomSVGContainer(roomSVGContainer){
    this._roomSVGContainer = roomSVGContainer;
  }

  get room3DContainer(){
    return this._room3DContainer;
  }

  set room3DContainer(room3DContainer){
    this._room3DContainer = room3DContainer;
  }


  addRoom2D(room: RoomData){
    this.setSVGGroup(this.getSelector().append('g'));
    this.getSVGGroup().attr('data-roomId', room.roomId)
      .attr('id', 'r-' + room.roomId + '_2d');

    if(room.active){
      this.getSVGGroup().classed('attachRoomClickEvent', true);
    }

    let plotter = new Plotter();
    plotter.setSelector(this.getSVGGroup());
    let thisRoom;
    if(room.coordinates.type === 'rect'){
      thisRoom = plotter.rectangle(room.coordinates as RoomRect);
    }
    if(room.coordinates.type === 'polygon'){
      thisRoom = plotter.polygon((room.coordinates as RoomPoly).points);
    }
    thisRoom
      .classed('room',true)
      .classed(room.type, true)

    this.setLabel(room);
    this.addDevices(room);
    this.addRoom3D(room);
  }

  getLabel(){
    return this.label;
  }


  setLabel(room: RoomData){
    if(room.label ===  undefined){
      return;
    }
    let label = this.calculateLabelPosition(room);
    let roomLabel = this.getSVGGroup().append('text');
    roomLabel.attr('lengthAdjust', 'spacing')
      .attr('x', label.coordinates.x)
      .attr('y', label.coordinates.y)
      //.attr('transform', '')
      .attr('dy', '1em')
      .classed('roomNameText', true)
      .text(label.name);
    let transform = '';
    this.wrap(roomLabel, label.length);
    if(label.orientation !== undefined){
      transform += 'rotate(' + label.orientation + ' ' + label.coordinates.x + ' ' + label.coordinates.y + ') ';
    }
    let noOfLines =  roomLabel.selectAll('tspan').size();
    if(label.fitRatio <= 1){
      roomLabel.attr('style', 'font-size: ' + (label.fitRatio * 0.25) + 'em');
      let transformK = '0 ' + (-2 * label.fitRatio * noOfLines); //label.orientation === 270 ? (2 * noOfLines) + ' 0' : '0 ' + (2 * noOfLines);
      transform += 'translate(' + transformK + ')';
    }
    roomLabel.attr('transform', transform);
    this.label = roomLabel;
  }

  addDevices(room: RoomData){
    if(room.devices === undefined){
      return;
    }
    let roomdata = room.coordinates.type === 'rect' ?
      room.coordinates as RoomRect : this.getBoundingRect(Plotter.getPointsFromString((room.coordinates as RoomPoly).points));
    let devicesg = this.getSVGGroup().append('g');
    devicesg.classed('device-numbers', true);
    room.devices.forEach(device => {
      devicesg.append('circle')
      .attr("cx", roomdata.origin.x + (roomdata.w * device.x/100))
      .attr("cy", roomdata.origin.y + (roomdata.h * device.y/100))
      .attr("r", 1)
      .attr("id", "dn-d-"+room.roomId+"-"+device.deviceId)
      .classed('device-marking', true);

      if(device.deviceId !== undefined) {
        devicesg.attr("data-device-id", `d-${room.roomId}-${device.deviceId}`);
      }
    })
  }

  isActive(){
    return this.getData().active === true;
  }

  $el(){
    return this.getSVGGroup();
  }

  addRoom3D(room: RoomData){
    /* if(room._3d === undefined || !this.isActive()){
      // return;
    } */
    this.draw3dRoomDivContainer();
    this.draw3dRoomSVGContainer(this.room3DContainer);
    this.drawOuterPolygon();
    this.drawWalls();
    // this.drawDoors();
    this.drawFloor();
    /* room3D.append('polygon')
      .attr('class', 'floor '+room._3d.floor.split('-')[0])
      .attr('points', room._3d.floor.split('-')[1]);*/

    this.addDoors3D(room);
    this.addDecorations3D();
    this.addDevices3D();
  }

  addDevices3D(){
    let room = this.getData();
    if(room.devices === undefined){
      return;
    }
    let roomSelector = this.roomSVGContainer;
    let devicesContainer = roomSelector.append('g')
      .attr('class', 'device-images');
    devicesContainer.selectAll('rect')
      .data(room.devices)
      .enter()
      .append('rect')
      .attr('x', (d: Appliance) => {
        d.scale = d.scale || 1;
        let adjustment = CONFIG[d.type] !== undefined ? CONFIG[d.type].width*d.scale/2 : 0;
        return d.x - adjustment;
      })
      .attr('y', (d: Appliance) => {
        d.scale = d.scale || 1;
        let adjustment = CONFIG[d.type] !== undefined ? CONFIG[d.type].height*d.scale/2 : 0;
        return d.y - adjustment;
      })
      .attr('class', (d: Appliance) => d.type.replace('_','-'))
      .each(function(d: Appliance) {
        let device = d3.select(this);
        d.scale = d.scale || 1;
        let style = '';
        let transform = '';
        if(d.deviceId !== undefined){
          device.attr('id', 'd-' + room.roomId + '-' + d.deviceId);
          device.attr('class', device.attr('class') + ' attachToggleEvent');
        }
        if(d.rotate !== undefined){
          transform += 'rotateZ(' + d.rotate + 'deg) ';
        }
        style += `transform-origin: ${d.x}px ${d.y}px 0px; `;
        if(d.scale !== undefined){
          let scale = 'scale(' + d.scale + ') ';
          transform += scale;
        }
        style += 'transform: ' + transform + ';';
        device.attr('style', style);

      });

  }

  addDecorations3D(){
    let room = this.getData();
    if(room.decorations === undefined){
      return;
    }
    let devicesContainer = this.roomSVGContainer.append('g')
      .attr('class', 'decorations-images');
    devicesContainer.selectAll('rect')
      .data(room.decorations)
      .enter()
      .append('rect')
      .attr('x', (d: Decoration) => {
        d.scale = d.scale || 1;
        let adjustment = CONFIG[d.type] !== undefined ? CONFIG[d.type].width*d.scale/2 : 0;
        return d.x - adjustment;
      })
      .attr('y', (d: Decoration) => {
        d.scale = d.scale || 1;
        let adjustment = CONFIG[d.type] !== undefined ? CONFIG[d.type].height*d.scale/2 : 0;
        return d.y - adjustment;
      })
      .attr('class', (d: Decoration) => d.type.replace('_','-'))
      .each(function(d: Decoration) {
        let style = '';
        let transform = '';
        transform += d.rotate !== undefined ? `rotateZ(${d.rotate}deg) ` : '';
        transform += d.scale !== undefined ? `scale(${d.scale}) ` : '';

        style += `transform-origin: ${d.x}px ${d.y}px 0px; `;
        style += transform !== '' ? `transform: ${transform}; ` : '';

        d3.select(this).attr('style', style);
      });
  }

  addDoors3D(room) {
    let walls = this.roomHelper.getWalls();
    let doors = this.getDoors();
    walls.forEach((wall, index) => {
      const doorLine = this.getDoorLineVector(wall);
      const wallLine = this.getWallBaseline(wall);
      doors[index].forEach(door2d => {
        let door = this.getNormalizedDoor(door2d, room);
        let doorStart: Victor, doorEnd: Victor;
        [doorStart, doorEnd] = this.sortDoorPoints(door, wallLine.outer);
        doorStart.subtract(wallLine.outer.start);
        doorEnd.subtract(wallLine.outer.start);

        const doorTopStart = doorLine.vector.clone().norm().multiplyScalar((doorStart.length() / wallLine.outer.vector.length()) * doorLine.vector.length()).add(doorLine.start);
        const doorTopEnd = doorLine.vector.clone().norm().multiplyScalar((doorEnd.length() / wallLine.outer.vector.length()) * doorLine.vector.length()).add(doorLine.start);
        const doorBaseStart = wallLine.inner.vector.clone().norm().multiplyScalar((doorStart.length() / wallLine.outer.vector.length()) * wallLine.inner.vector.length()).add(wallLine.inner.start);
        const doorBaseEnd = wallLine.inner.vector.clone().norm().multiplyScalar((doorEnd.length() / wallLine.outer.vector.length()) * wallLine.inner.vector.length()).add(wallLine.inner.start);

        // doorLineEnd.rotateBy(door.orientation);

        const doorPolygon: Point[] = [];
        doorPolygon.push(doorTopStart);
        doorPolygon.push(doorTopEnd);
        doorPolygon.push(doorBaseEnd);
        doorPolygon.push(doorBaseStart);

        this.roomSVGContainer.append('polygon')
          .attr('points', Plotter.getStringFromPoints(doorPolygon))
          .attr('fill', '#FFF8DC')
          .classed('door', true);
      });
    });
  }

  private setLength(vector: Victor, newLength: number) {
    return vector.clone().norm().multiplyScalar(newLength);
  }
  private getNormalizedDoor(door: Door, room: RoomData) {
    let doorNormalized: Door = {
      origin: {x: 0, y:0},
      length: door.length,
      orientation: door.orientation,
    }

    const roomCoords = room.coordinates.type === 'rect' ?
      room.coordinates as RoomRect : this.getBoundingRect(Plotter.getPointsFromString((room.coordinates as RoomPoly).points));

    doorNormalized.origin.x = ((door.origin.x - roomCoords.origin.x) / roomCoords.w) * 100;
    doorNormalized.origin.y = ((door.origin.y - roomCoords.origin.y) / roomCoords.h) * 100;
    doorNormalized.length = this.getDoorLength(doorNormalized, roomCoords);
    return doorNormalized;
  }

  private getWallBaseline(wall: Wall3D) {
    let inner: {start: Victor, end: Victor, vector: Victor} = {
      start: new Victor(wall.coordinates[3].x, wall.coordinates[3].y),
      end: new Victor(wall.coordinates[2].x, wall.coordinates[2].y),
      vector: undefined,
    };
    inner.vector = inner.end.clone().subtract(inner.start);

    let outer: {start: Victor, end: Victor, vector: Victor} = {
      start: new Victor(wall.coordinates[0].x, wall.coordinates[0].y),
      end: new Victor(wall.coordinates[1].x, wall.coordinates[1].y),
      vector: undefined,
    };
    outer.vector = outer.end.clone().subtract(outer.start);

    return {outer, inner};
  }

  private getDoorLength(door: Door, roomCoords){
    let sq = val => Math.pow(val, 2);
    let cossq = sq(Math.cos(door.orientation));
    let scale = 100 / roomCoords.h;
    return (scale * door.length) * Math.sqrt(cossq * (sq(roomCoords.h) / sq(roomCoords.w) - 1) + 1);
  }

  private sortDoorPoints(door: Door, wallLine): [Victor, Victor]{
    let doorStart = Victor.fromObject(door.origin);
    // doorStart.subtract(wallLine.start); // get vector in reference to inner wall prespective
    let doorEnd = new Victor(door.length,0);
    doorEnd.rotateDeg(door.orientation);
    doorEnd.add(doorStart);
    doorStart.subtract(wallLine.start);
    doorEnd.subtract(wallLine.start);
    [doorStart, doorEnd] = doorStart.length() < doorEnd.length() ? [doorStart, doorEnd] : [doorEnd, doorStart];
    doorEnd.add(wallLine.start);
    doorStart.add(wallLine.start);
    return [doorStart, doorEnd];
  }

  private getDoorLineVector(wall: Wall3D) {
    let lineVectors = {
      startStart: new Victor(wall.coordinates[3].x, wall.coordinates[3].y),
      startEnd: new Victor(wall.coordinates[0].x, wall.coordinates[0].y),
      endStart: new Victor(wall.coordinates[2].x, wall.coordinates[2].y),
      endEnd: new Victor(wall.coordinates[1].x, wall.coordinates[1].y),
    }

    let startLineVector = lineVectors.startEnd.clone().subtract(lineVectors.startStart);
    let endLineVector = lineVectors.endEnd.clone().subtract(lineVectors.endStart);

    let doorLine: {start: Victor, end: Victor, vector: Victor} = {
      start: startLineVector.clone().multiply(new Victor(0.8, 0.8)).add(lineVectors.startStart),
      end: endLineVector.clone().multiply(new Victor(0.8, 0.8)).add(lineVectors.endStart),
      vector: undefined,
    };

    doorLine.vector = doorLine.end.clone().subtract(doorLine.start);

    return doorLine;
  }

  private draw3dRoomDivContainer(){
    this.room3DContainer = this.getSelector3D().append('div')
      .classed('room-layout', true)
      .classed('display-none', true)
      .attr('id', 'r-' + this.getData().roomId + '_3d')
      .attr('data-room-id',this.getData().roomId);
  }

  private draw3dRoomSVGContainer(room3Dcontainer){
    let padding = 0;
    let roomSVGContainer = room3Dcontainer.append('svg')
      .classed('room-blue-print', true)
      .attr('preserveAspectRatio', 'xMinYMin meet')
      .attr('version', '1.1')
      .attr('viewBox', `-${padding} -${padding} ${100+2*padding} ${100+2*padding}`)
      .attr('width','100%')
      .attr('height','100%')
      .attr('fill','#000')
      .attr('xmlns', 'http://www.w3.org/2000/svg');
    this.roomSVGContainer = roomSVGContainer;
    return this.roomSVGContainer;
  }

  private drawOuterPolygon(){
    let outerPolygon = this.roomHelper.getRoomPolygon();
    this.roomSVGContainer.append('polygon')
      .classed('outer-polygon', true)
      .attr('points', Plotter.getStringFromPoints(outerPolygon));
  }

  private drawWalls(){
    let color = '#D3C5B8';
    let walls = this.roomHelper.getWalls();
    let defs = d3.select('#defs defs');
    let htmlTemplate = `<stop offset="10%" stop-color="${color}" stop-opacity="0.9"/>\
        <stop offset="80%" stop-color="${color}" stop-opacity="0.6"/>`;
    let roomId = this.getData().roomId;
    for (let i = 0; i < walls.length; i++) {
      const wall = walls[i];
      this.roomSVGContainer.append('polygon')
        // .classed('wall', true)
        .attr('points', Plotter.getStringFromPoints(wall.coordinates))
        .attr('fill',`url(#wall-gradient-${wall.angle})`);
      if (d3.select(`#wall-gradient-${wall.angle}`).empty()) {
        defs.append('linearGradient')
        .attr('gradientUnits','objectBoundingBox')
        .attr('gradientTransform',`rotate(${wall.angle}, ${wall.relativeDisplacement.x}, ${wall.relativeDisplacement.y})`)
        .attr('id',`wall-gradient-${wall.angle}`)
        .html(htmlTemplate);
      }
    }
  }

  private drawFloor(){
    let innerCoords = this.roomHelper.getInnerCoords();
    this.roomSVGContainer.append('polygon')
        .classed('floor', true)
        .classed(this.getData().floor, true)
        .attr('points', Plotter.getStringFromPoints(innerCoords))
        .attr('fill','url(#woodenFloor)');

  }

  private drawDoors(){
    if(this.getData().doors === undefined){
      return;
    }
    this.getData().doors.map((door) => {
      this.roomSVGContainer.append('polygon')
        // .classed('door', true)
        .attr('points', door.polygon)
        .attr('fill', door.color !== undefined ? door.color : '#FFFFFF');
    })
  }

  private drawDoorsCSS(){
    let walls = this.roomHelper.getWalls();
    let onWall = 1;
    let style = `
      left: ${walls[onWall].coordinates[0].x + 2}%;
      top: ${walls[onWall].coordinates[0].x + 2}%;
      width: ${Math.sqrt(Math.pow(walls[onWall].coordinates[1].x-walls[onWall].coordinates[0].x,2) + Math.pow(walls[onWall].coordinates[1].y-walls[onWall].coordinates[0].y,2)) - 4}%;
      height: 15%;
      transform: rotate(${walls[onWall].angle-90}deg);
      position: absolute;
    `;
    this.room3DContainer.append('xhtml:div')
    .attr('style',style)
    .append('xhtml:div')
        .attr('style', 'perspective:1000px;width:80%;height:100%;perspective-origin:50% 333%;transform: rotateZ(0);transform-origin: 0 0;margin: auto;')
        .append('xhtml:div')
            .attr('style', `
                background-image: url('http://pngimg.com/uploads/door/door_PNG17628.png');
                background-size: 100% 100%;
                width: 20%;
                height: 333%;
                position: relative;
                left: 0%;
                top: -100%;
                display: inline-block;
                transform: rotateX(90deg)
            `)
            .attr('xmlns','http://www.w3.org/1999/xhtml')
            .html('');
  }

  private wrap(text: any, width: number) {
    text.each(function() {
      let text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr('y'),
          x = text.attr('x'),
          dy = parseFloat(text.attr('dy')),
          tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', `${dy}em`);
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if ((tspan.node() as any).getComputedTextLength() > width) {
          line.pop();
          if(line.length == 0){
            tspan.remove();
            lineNumber--;
          } else{
            tspan.text(line.join(' '));
          }
          line = [word];
          tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', `${++lineNumber * lineHeight + dy}em`).text(word.replace('_',' '));
        }
      }
    });
  }


  /**
   * ALGO:
   * if (word fits) then (find length)
   * else (if it can be broken) then(find the maxWordLength)
   *
   * if(maxWordLength can fit) then (find length)
   * else (try to fit it in height)
   */
  private calculateLabelPosition(room: RoomData){
    let CONSTS = {
      MAX_SIZE_FACTOR: 2,
      MIN_SIZE_FACTOR: 0.5,
      SIDE_BUFFER: 0.25
    }

    let roomCoordinates = room.coordinates.type === 'rect' ?
      room.coordinates as RoomRect : this.getBoundingRect(Plotter.getPointsFromString((room.coordinates as RoomPoly).points));
    let labelPosition: RoomLabel = {
      length: room.label.length,
      orientation: room.label.orientation,
      coordinates: room.label.coordinates,
      name: room.label.name,
      fitRatio: 1
    };
    //Text height hack
    if(room.label.length === undefined){//calculate length
      let maxLength = room.label.name.length * CONSTS.MAX_SIZE_FACTOR;
      if(maxLength < roomCoordinates.w){//the label can fit
        labelPosition.length = maxLength;
      } else{
        // Break the label
        let labelArr = room.label.name.split(' ');
        // Find longest word
        let maxWordLength = 0;
        labelArr.forEach(word => maxWordLength = word.length > maxWordLength ? word.length : maxWordLength)
        maxWordLength *= CONSTS.MAX_SIZE_FACTOR;
        // Then find if it fits
        if(maxWordLength < roomCoordinates.w){//the label can fit
          labelPosition.length = maxWordLength;
        } else{// if it still doesnt fit
          if(maxLength < roomCoordinates.h){// if it fits height wise
            labelPosition.length = maxLength;
            labelPosition.orientation = 270;
          } else{//if it still doesn't fits
            let lengthToFit = Math.max(roomCoordinates.w, roomCoordinates.h);
            labelPosition.fitRatio = (lengthToFit/maxWordLength) * 0.9;
            if(labelPosition.fitRatio >= 1){
              labelPosition.fitRatio = 1;
            }
            if(labelPosition.fitRatio > CONSTS.MIN_SIZE_FACTOR){
              labelPosition.length = lengthToFit;
            }
            if(roomCoordinates.w >= roomCoordinates.h){
              labelPosition.orientation = 0;
            }
          }
          // find the fitting ratio
        }
      }
    }
    if(room.label.orientation !== undefined){
      labelPosition.orientation = room.label.orientation;
    }
    if(room.label.coordinates === undefined){
      labelPosition.coordinates = {
        x: 0,
        y: 0
      };
      labelPosition.coordinates.x = roomCoordinates.origin.x + (roomCoordinates.w / 2);// - positionAdjust.x;
      labelPosition.coordinates.y = roomCoordinates.origin.y + (roomCoordinates.h / 2);// - positionAdjust.y;
    }
    labelPosition.length = Math.floor(labelPosition.length * (1 - CONSTS.SIDE_BUFFER));
    return labelPosition;
  }

  private getBoundingRect(points: Point[]){
    let maxPt = points.reduce((acc, currVal) => {
      return {
        x: Math.max(acc.x, currVal.x),
        y: Math.max(acc.y, currVal.y)
      }
    });

    let boundingRect: RoomRect = {
      type: 'rect',
      origin: points.reduce((acc, currVal) => {
        return {
          x: Math.min(acc.x, currVal.x),
          y: Math.min(acc.y, currVal.y)
        }
      }),
      w: 0,
      h: 0
    };

    boundingRect.w = maxPt.x - boundingRect.origin.x;
    boundingRect.h = maxPt.y - boundingRect.origin.y;

    return boundingRect;
  }
}
