///<reference path="./plotter.d.ts"/>
import * as d3 from 'd3';
//import * as d3Scale from "d3-scale";

export class Plotter{

  private selector;

  getSelector(){
    return this.selector;
  }
  setSelector(selector){
    this.selector = selector;
  }

  polygon(points: string){
      return this.getSelector()
      .append('polygon')
      .attr('points', points);
  }

  rectangle(rect){
    return this.getSelector()
    .append('rect')
    .attr('x',rect.origin.x)
    .attr('y',rect.origin.y)
    .attr('width',rect.w)
    .attr('height',rect.h);

  }

  static getPointsFromString(points: string): Point[]{
    let pts = points.split(' ').map(point => {
        let pt = point.split(',');
        return {x: parseInt(pt[0]), y:parseInt(pt[1])};
    })
    return pts;
  }
  static getStringFromPoints(points: Point[]): string{
    return points.map(point => Math.round(point.x * 10)/10 + ',' + Math.round(point.y * 10)/10).join(' ');
  }

  static rectToPolygon(rectangle: RoomRect): Point[]{
    let polyCoords:Point[] = [];
    polyCoords.push({x: rectangle.origin.x, y: rectangle.origin.y});
    polyCoords.push({x: rectangle.origin.x + rectangle.w, y: rectangle.origin.y});
    polyCoords.push({x: rectangle.origin.x + rectangle.w, y: rectangle.origin.y + rectangle.h});
    polyCoords.push({x: rectangle.origin.x, y: rectangle.origin.y + rectangle.h});
    return polyCoords;
  }


}
