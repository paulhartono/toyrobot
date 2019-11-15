import Table from "../table"
import { Robot } from "../robot"
import Coordinate from "../coordinate"

export class Rules {

  table: Table

  constructor(table: Table) {
    this.table = table
  }

  isRobotOnTable(robot: Robot): boolean {
    return (
      !!robot.coordinate && 
      robot.coordinate.x >= 0 &&
      robot.coordinate.y >= 0 && 
      robot.coordinate.x < this.table.sizeX && 
      robot.coordinate.y < this.table.sizeY
    )
  }

  isRobotOnPlay(robot: Robot): boolean {
    return (!!robot.direction && this.isRobotOnTable(robot))
  }

  isValidCoordinate(c: Coordinate): boolean {
    return (
      c.x >= 0 &&
      c.y >= 0 && 
      c.x < this.table.sizeX && 
      c.y < this.table.sizeY
    )
  }

}