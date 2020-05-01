interface RoomData{
  coordinates: RoomRect|RoomPoly,
  type: 'bedroom' | 'livingroom' | 'bathroom' | 'balcony' | 'kitchen' | 'outside' | 'stairs',
  // type: string,
  roomId: number,
  active: boolean,
  label?: RoomLabel
  floor?: 'wooden' | 'marble',
  doors?: {
    polygon: string,
    color?: string
  }[],
  devices?: Appliance[],
  decorations?: Decoration[]
}

interface RoomRect{
  type: 'rect',
  origin: Point,
  w: number,
  h: number
}

interface RoomPoly{
  type: 'polygon',
  points?: string
}

interface RoomLabel{
  name: string,
  coordinates?: {
    x: number,
    y: number
  },
  length?: number,
  orientation?: number,
  fitRatio?: number
}

interface RoomInfo{
  $el: any,
  data: RoomData
}

interface Door{
  orientation: number,
  origin: {
    x: number,
    y: number,
  },
  length: number
}

interface Door2D{
  x1: number,
  y1: number,
  x2: number,
  y2: number
}

interface Entrance{
  x: number,
  y: number,
  length: number,
  orientation: number
}

interface DevicesOverview{
  x: number,
  y: number
}

interface Decoration{
  type: 'bed' | 'sofa_1seat' | 'sofa_2seat' | 'table' | 'dining_set' | 'television',
  x2D: number,
  y2D: number,
  x: number,
  y: number,
  scale?: number,
  rotate?: number,
}

interface Appliance{
  type: 'socket' | 'tubelight' | 'fan' | 'wall_lamp' | 'bulb' | 'chandelier' | 'airconditioner' | 'geyser' | 'refrigerator'  | 'washingMachine' | 'computer'| 'television' | 'water_pump',
  x: number,
  y: number,
  scale?: number,
  rotate?: number,
  deviceId?: number
}

interface Wall3D{
  angle: number,
  coordinates: Point[],
  relativeDisplacement: {
    x: number,
    y: number
  }
}

type FloorType = 'wooden' | 'marble';
type RoomType = 'bedroom' | 'livingroom' | 'bathroom' | 'balcony' | 'kitchen' | 'outside';
type ApplianceType = 'socket' | 'tubelight' | 'fan' | 'wall_lamp' | 'bulb' | 'chandelier' | 'airconditioner' | 'geyser' | 'refrigerator' | 'washingMachine' | 'computer' | 'television' | 'water_pump';
type DecorationType = 'bed' | 'sofa_1seat' | 'sofa_2seat' | 'table' | 'dining_set';
