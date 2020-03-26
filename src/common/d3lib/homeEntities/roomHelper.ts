/**
 * 3D Room Coordinates calculator
 */

import Victor from 'victor';
import {
  Plotter
} from '../basePlotter';
const centuryVector = new Victor(50, 50);

export class RoomHelper {

  private innerCoordinates: Point[];
  private roomPolygon: Point[];
  private walls: Wall3D[];

  constructor(room: RoomData) {
    this.setRoomPolygon(room.coordinates);
    this.setInnerCoords(this.getRoomPolygon());
    this.setWalls(this.getRoomPolygon(), this.getInnerCoords());
  }

  getInnerCoords() {
    return this.innerCoordinates;
  }

  setInnerCoords(polyCoords ? : Point[]) {
    let innerVertices = [];
    let noOfVertices = polyCoords.length;
    let normalizedPolyCoords = this.getNormalizedPolygon(polyCoords);
    for (let i = 0; i < noOfVertices; i++) {
      let prev = (i - 1 + noOfVertices) % noOfVertices;
      let next = (i + 1) % noOfVertices;

      const pp = normalizedPolyCoords[prev];
      const p0 = normalizedPolyCoords[i];
      const pn = normalizedPolyCoords[next];

      let vp = new Victor(pp.x, pp.y);
      let v0 = new Victor(p0.x, p0.y);
      let vn = new Victor(pn.x, pn.y);

      let v_this = vn.clone().subtract(v0);
      let v_prev = vp.clone().subtract(v0);

      let bisection = v_prev.clone().norm().add(v_this.clone().norm());
      bisection.multiply(centuryVector)

      if (this.isConcave(v_this, v_prev)) {
        bisection.rotateDeg(180);
      }

      let length = this.getBisectorLength(v_this, v_prev);
      const lengthVector = new Victor(length, length);
      bisection.norm().multiply(lengthVector)
      bisection.add(v0);
      innerVertices.push(bisection);
    }
    this.innerCoordinates = innerVertices;
  }

  getRoomPolygon() {
    return this.roomPolygon;
  }

  setRoomPolygon(coordinates) {
    this.roomPolygon = coordinates.type === 'rect' ? Plotter.rectToPolygon(coordinates) : Plotter.getPointsFromString(coordinates.points);
  }

  getWalls() {
    return this.walls;
  }

  /**
   * Get Walls Coordinates as array or polygon points
   * @param polyCoords Array of points of outer coordinates
   * @param innerCoords Array of points of inner coordinates
   * @returns Wall data
   */
  setWalls(polyCoords: Point[], innerCoords: Point[]) {
    let wallsInfo: Wall3D[] = [];
    let wallsCoordinates = this.getWallsCoordinates(polyCoords, innerCoords);
    for (let i = 0; i < polyCoords.length; i++) {
      let next = (i + 1) % polyCoords.length;
      let pn = Victor.fromObject(polyCoords[next]);
      let p0 = Victor.fromObject(polyCoords[i]);

      let vector100 = new Victor(100, 100);
      let wallVector = pn.clone().subtract(p0);
      wallVector.norm().multiply(vector100);
      wallVector.rotateDeg(90);

      let leftAdjust = wallVector.clone().norm().x / 20;
      let topAdjust = wallVector.clone().norm().y / 20;
      const angle = wallVector.angleDeg() > 0 ? wallVector.angleDeg() : (360 + wallVector.angleDeg()) % 360;

      wallsInfo.push({
        coordinates: wallsCoordinates[i],
        angle: Math.round(angle) as number,
        relativeDisplacement: {
          x: 0.5 + leftAdjust,
          y: 0.5 + topAdjust
        },
      });
    }
    this.walls = wallsInfo;
  }

  private getWallsCoordinates(polyCoords: Point[], innerCoords: Point[]): Point[][] {
    let polygonPoints: Point[][] = [];
    for (let i = 0; i < polyCoords.length; i++) {
      let thisWall: Point[] = [];
      let next = (i + 1) % polyCoords.length;
      thisWall.push(polyCoords[i]);
      thisWall.push(polyCoords[next]);
      thisWall.push(innerCoords[next]);
      thisWall.push(innerCoords[i]);
      polygonPoints.push(thisWall);
    }
    return polygonPoints;
  }

  private isConcave(v_this, v_prev) {
    let v_prev_rev = v_prev.multiply(new Victor(-1, -1));
    let angle = v_this.horizontalAngleDeg() - v_prev_rev.horizontalAngleDeg();
    if ((0 < angle && angle < 180) || (-360 < angle && angle < -180)) {
      return false;
    } else {
      return true;
    }
  }

  private getBisectorLength(v_this, v_prev) {
    let theta = Math.abs(v_prev.clone().horizontalAngleDeg() - v_this.clone().horizontalAngleDeg());
    theta = theta > 180 ? 360 - theta : theta;
    let length = 15 / Math.sin((theta * Math.PI) / (2 * 180));
    return length;
  }

  private getNormalizedPolygon(polygon: Point[]): Point[] {
    let normalizeCoordinate: Point = {
      x: Math.min.apply(null, polygon.map(point => point.x)),
      y: Math.min.apply(null, polygon.map(point => point.y)),
    };
    let maxCoordinate: Point = {
      x: Math.max.apply(null, polygon.map(point => point.x)),
      y: Math.max.apply(null, polygon.map(point => point.y)),
    };
    let adjustment= {
      x: 100 / (maxCoordinate.x - normalizeCoordinate.x),
      y: 100 / (maxCoordinate.y - normalizeCoordinate.y)
    }

    return polygon.map((point) => {
      point.x = (point.x - normalizeCoordinate.x) * adjustment.x;
      point.y = (point.y - normalizeCoordinate.y) * adjustment.y;
      return point;
    });
  }
}
