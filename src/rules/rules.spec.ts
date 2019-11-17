import Coordinate from "../coordinate"
import Table from "../table"
import Rules, { Direction } from "."
import { Robot } from "../robot"

let table: Table
let rules: Rules
let robot: Robot
let validCoordinate:Coordinate 
let invalidCoordinate: Coordinate

describe('Rules', () => {
  beforeAll(() => {
    table = { sizeX: 5, sizeY: 5 }
    rules = new Rules(table)
    robot = {name:'TestRobot'}
    validCoordinate = {x: 2, y:2}
    invalidCoordinate = {x:6, y:6}
  })

  describe('Coordinate Check', () => {
    test('should return true when it is inside the table' , () => {
      let result = rules.isValidCoordinate(validCoordinate)
      expect(result).toEqual(true)
    })

    test('should return false when it is outside the table' , () => {
      let result = rules.isValidCoordinate(invalidCoordinate)
      expect(result).toEqual(false)
    })
  })

  describe('Is Robot on Table Check', () => {

    test('should return true when robot\'s coordinate is within the size of the table' , () => {
      robot.coordinate = validCoordinate
      let result = rules.isRobotOnTable(robot)
      expect(result).toEqual(true)
    })

    test('should return false when robot\'s coordinate is beyond the size of the table' , () => {
      robot.coordinate = invalidCoordinate
      let result = rules.isRobotOnTable(robot)
      expect(result).toEqual(false)
    })
  })
  
  describe('Is Robot on Play Check', () => {
    test('should return true when robot\'s coordinate AND facing direction is correct' , () => {

      robot.coordinate = validCoordinate
      robot.direction = Direction.NORTH
      let result = rules.isRobotOnPlay(robot)
      expect(result).toEqual(true)
    })

    test('should return false when either robot\'s coordinate OR facing direction is incorrect' , () => {

      robot.coordinate = invalidCoordinate
      let result = rules.isRobotOnPlay(robot)
      expect(result).toEqual(false)
    })
  })
  
})
