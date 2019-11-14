import Coordinate from "./coordinate"

class Table {

  sizeX: number
  sizeY: number
  startCoordinate: Coordinate
  endCoordinate: Coordinate

  constructor(sizeX: number, sizeY: number) {
    this.sizeX = sizeX
    this.sizeY = sizeY
    this.startCoordinate = new Coordinate(0,0)
    this.endCoordinate = new Coordinate(this.sizeX-1, this.sizeY-1)
  }
}

export default Table