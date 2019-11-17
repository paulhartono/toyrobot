import RobotService, { Robot } from "."
import Rules, { Direction } from "../rules"
import Coordinate from "../coordinate"
import Table from "../table"

let table: Table
let robot: Robot
let rules: Rules
let validCoordinate: Coordinate
let invalidCoordinate: Coordinate
let service: RobotService

describe('Robot Service', () => {

  beforeAll(() => {
    table = { sizeX: 5, sizeY: 5 }
    rules = new Rules(table)
    robot = {name:'TestRobot'}
    validCoordinate = {x: 2, y:2}
    invalidCoordinate = {x:6, y:6}
    service = new RobotService(rules, robot)
  })

  describe('Command: PLACE', () => {
    test('should return false when coordinate is not within the size of the table' , () => {
      let result = service.place(invalidCoordinate, Direction.NORTH)
      expect(result).toEqual(false)
    })

    test('should return true, when all is good' , () => {
      let result = service.place(validCoordinate, Direction.NORTH)
      expect(result).toEqual(true)
    })
  })

  describe('Command: MOVE', () => {
    
    describe('Move NORTH', () => {
      test('should ignore move if robot not in any coordinate' , () => {
        robot.coordinate = undefined
        service._moveNorth()
        expect(robot.coordinate).toBeUndefined()
      })

      test('should ignore move if robot going to fall' , () => {
        robot.coordinate = {x:0,y:4}
        service._moveNorth()
        expect(robot.coordinate).toEqual({x:0,y:4})
      })

      test('should update y = y+1, when all the checks above are good' , () => {
        robot.coordinate = validCoordinate
        service._moveNorth()
        expect(robot.coordinate).toEqual({x:2,y:3})
      })
    })

    describe('Move EAST', () => {
      test('should ignore move if robot not in any coordinate' , () => {
        robot.coordinate = undefined
        service._moveEast()
        expect(robot.coordinate).toBeUndefined()
      })

      test('should ignore move if robot going to fall' , () => {
        robot.coordinate = {x:4,y:4}
        service._moveEast()
        expect(robot.coordinate).toEqual({x:4,y:4})
      })

      test('should update x = x+1, when all the checks above are good' , () => {
        robot.coordinate = validCoordinate
        service._moveEast()
        expect(robot.coordinate).toEqual({x:3,y:2})
      })
    })

    describe('Move SOUTH', () => {
      test('should ignore move if robot not in any coordinate' , () => {
        robot.coordinate = undefined
        service._moveSouth()
        expect(robot.coordinate).toBeUndefined()
      })

      test('should ignore move if robot going to fall' , () => {
        robot.coordinate = {x:4,y:0}
        service._moveSouth()
        expect(robot.coordinate).toEqual({x:4,y:0})        
      })

      test('should update y = y-1, when all the checks above are good' , () => {
        robot.coordinate = validCoordinate
        service._moveSouth()
        expect(robot.coordinate).toEqual({x:2,y:1})       
      })
    })

    describe('Move WEST', () => {
      test('should ignore move if robot not in any coordinate' , () => {
        robot.coordinate = undefined
        service._moveWest()
        expect(robot.coordinate).toBeUndefined()        
      })

      test('should ignore move if robot going to fall' , () => {
        robot.coordinate = {x:0,y:4}
        service._moveWest()
        expect(robot.coordinate).toEqual({x:0,y:4})        
      })

      test('should update x = x-1, when all the checks above are good' , () => {
        robot.coordinate = validCoordinate
        service._moveWest()
        expect(robot.coordinate).toEqual({x:1,y:2})       
      })
    })

    test('should ignore move when robot not on table (play)' , () => {
      robot.coordinate = undefined
      service.move()
      expect(robot.coordinate).toBeUndefined()    
      if (robot.direction)
        expect(robot.direction).toBe(robot.direction)    
      else 
        expect(robot.direction).toBeUndefined()    
    })

    test('should Move NORTH when robot face NORTH' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.NORTH
      service.move()
      expect(robot.coordinate).toEqual({x:2,y:3})    
      expect(robot.direction).toEqual(Direction.NORTH)
    })

    test('should Move EAST when robot face EAST' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.EAST
      service.move()
      expect(robot.coordinate).toEqual({x:3,y:2})    
      expect(robot.direction).toEqual(Direction.EAST)
    })

    test('should Move SOUTH when robot face SOUTH' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.SOUTH
      service.move()
      expect(robot.coordinate).toEqual({x:2,y:1})    
      expect(robot.direction).toEqual(Direction.SOUTH)
    })

    test('should Move WEST when robot face WEST' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.WEST
      service.move()
      expect(robot.coordinate).toEqual({x:1,y:2})    
      expect(robot.direction).toEqual(Direction.WEST)
    })
  })

  describe('Command: LEFT', () => {
    test('should ignore move when robot not on table (play)' , () => {
      robot.coordinate = undefined
      service.turnLeft()
      expect(robot.coordinate).toBeUndefined()    
      if (robot.direction)
        expect(robot.direction).toBe(robot.direction)    
      else 
        expect(robot.direction).toBeUndefined()          
    })

    test('robot should face WEST after command if robot was facing NORTH before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.NORTH
      service.turnLeft()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.WEST)
    })

    test('robot should face NORTH after command if robot was facing EAST before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.EAST
      service.turnLeft()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.NORTH)
    })

    test('robot should face EAST after command if robot was facing SOUTH before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.SOUTH
      service.turnLeft()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.EAST)
    })

    test('robot should face SOUTH after command if robot was facing WEST before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.WEST
      service.turnLeft()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.SOUTH)
    })
  })

  describe('Command: RIGHT', () => {
    test('should ignore move when robot not on table (play)' , () => {
      robot.coordinate = undefined
      service.turnRight()
      expect(robot.coordinate).toBeUndefined()    
      if (robot.direction)
        expect(robot.direction).toBe(robot.direction)    
      else 
        expect(robot.direction).toBeUndefined()    
    })

    test('robot should face EAST after command if robot was facing NORTH before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.NORTH
      service.turnRight()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.EAST)
    })

    test('robot should face SOUTH after command if robot was facing EAST before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.EAST
      service.turnRight()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.SOUTH)
    })

    test('robot should face WEST after command if robot was facing SOUTH before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.SOUTH
      service.turnRight()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.WEST)
    })

    test('robot should face NORTH after command if robot was facing WEST before command' , () => {
      robot.coordinate = validCoordinate
      robot.direction = Direction.WEST
      service.turnRight()
      expect(robot.coordinate).toEqual(validCoordinate)    
      expect(robot.direction).toEqual(Direction.NORTH)
    })
  })

  describe('Command: Report', () => {
    test('should return "Robot NOT on table" when robot does not have coordinate' , () => {
      try {      
        robot.coordinate = undefined
        let result = service.report()
      } catch (e) {
        expect(e).toEqual('Robot NOT on table') 
      }
    })

    test('should return "Robot NOT facing right direction.. thus NOT on table" when robot does not face anywhere' , () => {
      try {      
        robot.direction = undefined
        robot.coordinate = validCoordinate
        let result = service.report()
      } catch (e) {
        expect(e).toEqual('Robot NOT facing right direction.. thus NOT on table') 
      }
    })

    test('should return location and facing direction' , () => {
      robot.direction = Direction.NORTH
      robot.coordinate = validCoordinate
      let result = service.report()
      expect(result).toEqual('2,2,NORTH')
    })

  })
})
