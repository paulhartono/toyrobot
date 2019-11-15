import { Robot } from './robot'
import Rules, { Direction }  from "../rules";
import Coordinate from "../coordinate";

export class RobotService {
  
  rules: Rules = {} as Rules
  robot: Robot = {} as Robot

  constructor(rules: Rules, robot: Robot) {
    this.rules = rules
    this.robot = robot
  }

  greet() {
    console.log(`${this.robot.name} says HELLOOOOO!!!`)
  }

  place(c: Coordinate, direction: Direction): boolean {
    if (!this.rules.isValidCoordinate(c)) {
      return false
    }
    
    this.robot.coordinate = c
    this.robot.direction = direction
    return true
  }

  move() {

  }

  rotate() {

  }

  report(): string {
    if (!this.robot.coordinate) throw 'Robot NOT on table'
    if (!this.robot.direction) throw 'Robot NOT facing right direction.. thus NOT on table'

    return `${this.robot.coordinate.x},${this.robot.coordinate.y},${this.robot.direction}`
  }

}
