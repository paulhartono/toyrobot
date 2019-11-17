import { Robot } from './robot'
import Rules, { Direction }  from "../rules";
import Coordinate from "../coordinate";

export class RobotService {
  
  public rules: Rules = {} as Rules
  public robot: Robot = {} as Robot

  constructor(rules: Rules, robot: Robot) {
    this.rules = rules
    this.robot = robot
  }

  place(c: Coordinate, direction: Direction): boolean {
    if (!this.rules.isValidCoordinate(c)) {
      return false
    }
    
    this.robot.coordinate = c
    this.robot.direction = direction
    return true
  }

  _moveNorth() {
    if (this.robot.coordinate) {
      let nextCoordinate: Coordinate = { 
        x: this.robot.coordinate.x,
        y: this.robot.coordinate.y + 1
      }

      if (this.rules.isValidCoordinate(nextCoordinate))
        this.robot.coordinate = nextCoordinate
    }
  }

  _moveEast() {
    if (this.robot.coordinate) {
      let nextCoordinate: Coordinate = { 
        x: this.robot.coordinate.x + 1,
        y: this.robot.coordinate.y
      }

      if (this.rules.isValidCoordinate(nextCoordinate))
        this.robot.coordinate = nextCoordinate
    }
  }

  _moveSouth() {
    if (this.robot.coordinate) {
      let nextCoordinate: Coordinate = { 
        x: this.robot.coordinate.x,
        y: this.robot.coordinate.y - 1
      }

      if (this.rules.isValidCoordinate(nextCoordinate))
        this.robot.coordinate = nextCoordinate
    }
  }

  _moveWest() {
    if (this.robot.coordinate) {
      let nextCoordinate: Coordinate = { 
        x: this.robot.coordinate.x - 1,
        y: this.robot.coordinate.y
      }

      if (this.rules.isValidCoordinate(nextCoordinate))
        this.robot.coordinate = nextCoordinate
    }
  }

  move(): void {
    if (this.rules.isRobotOnPlay(this.robot)) {
      if (this.robot.direction === Direction.NORTH) this._moveNorth()
      else if (this.robot.direction === Direction.EAST) this._moveEast()
      else if (this.robot.direction === Direction.SOUTH) this._moveSouth()
      else this._moveWest()
    } 
  }

  turnLeft(): void {
    if (this.rules.isRobotOnPlay(this.robot)) {
      if (this.robot.direction === Direction.NORTH) this.robot.direction = Direction.WEST
      else if (this.robot.direction === Direction.EAST) this.robot.direction = Direction.NORTH
      else if (this.robot.direction === Direction.SOUTH) this.robot.direction = Direction.EAST
      else this.robot.direction = Direction.SOUTH
    } 
  }

  turnRight(): void {
    if (this.rules.isRobotOnPlay(this.robot)) {
      if (this.robot.direction === Direction.NORTH) this.robot.direction = Direction.EAST
      else if (this.robot.direction === Direction.EAST) this.robot.direction = Direction.SOUTH
      else if (this.robot.direction === Direction.SOUTH) this.robot.direction = Direction.WEST
      else this.robot.direction = Direction.NORTH
    } 
  }

  report(): string {
    if (!this.robot.coordinate) throw 'Robot NOT on table'
    if (!this.robot.direction) throw 'Robot NOT facing right direction.. thus NOT on table'

    return `${this.robot.coordinate.x},${this.robot.coordinate.y},${this.robot.direction}`
  }

}
