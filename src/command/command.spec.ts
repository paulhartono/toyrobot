import { handleCommand } from './index';
import RobotService, { Robot } from '../robot';
import Table from '../table';
import Rules, { Direction } from '../rules';

const table: Table = {
  sizeX: 5,
  sizeY: 5
}

let robot: Robot 
// let rules: Rules
// let service: RobotService

jest.mock('../robot/robot-service')
jest.mock('../rules/rules')

const MockService = RobotService as jest.Mock<RobotService>;
const MockRules = Rules as jest.Mock<Rules>;

describe('Handle Command Input', () => {
  let rules: Rules;
  let service: RobotService;

  beforeAll (() => {
    rules = new MockRules(table)
    robot = { name: 'ROBOT-X' } as Robot
    service = new MockService(rules, robot)
    service.place({x:1,y:1}, Direction.NORTH)
  })

  test('Invalid command' , () => {
    let result = handleCommand('any invalid command here', service)
    expect(result).toEqual(false)
  })

  test('PLACE COMMAND with no argument should throw error' , () => {
    try {
      let result = handleCommand('PLACE', service)
    } catch (e) {
      expect(e).toEqual('PLACE command require arguments in the form of [x],[y],[direction]')
    }
  })

  test('PLACE COMMAND with no direction should throw error' , () => {
    try {
      let result = handleCommand('PLACE 1,2', service)
    } catch (e) {
      expect(e).toEqual('Unrecognise Direction')
    }
  })

  test('PLACE COMMAND with correct coordinate and facing NORTH should place robot accordingly on the table' , () => {
    let result = handleCommand('PLACE 1,2,NORTH', service)
    expect(result).toEqual(true)
    expect(service.place).toHaveBeenCalledWith({x:1,y:2}, Direction.NORTH)
  })

  test('PLACE COMMAND with correct coordinate and facing EAST should place robot accordingly on the table' , () => {
    let result = handleCommand('PLACE 1,2,EAST', service)
    expect(result).toEqual(true)
    expect(service.place).toHaveBeenCalledWith({x:1,y:2}, Direction.EAST)
  })

  test('PLACE COMMAND with correct coordinate and facing WEST should place robot accordingly on the table' , () => {
    let result = handleCommand('PLACE 1,2,WEST', service)
    expect(result).toEqual(true)
    expect(service.place).toHaveBeenCalledWith({x:1,y:2}, Direction.WEST)
  })

  test('PLACE COMMAND with correct coordinate and facing SOUTH should place robot accordingly on the table' , () => {
    let result = handleCommand('PLACE 1,2,SOUTH', service)
    expect(result).toEqual(true)
    expect(service.place).toHaveBeenCalledWith({x:1,y:2}, Direction.SOUTH)
  })

  test('MOVE COMMAND' , () => {
    let result = handleCommand('MOVE', service)
    expect(result).toEqual(true)
    expect(service.move).toHaveBeenCalled()
  })

  test('LEFT COMMAND' , () => {
    let result = handleCommand('LEFT', service)
    expect(result).toEqual(true)
    expect(service.turnLeft).toHaveBeenCalled()
  })

  test('RIGHT COMMAND' , () => {
    let result = handleCommand('RIGHT', service)
    expect(result).toEqual(true)
    expect(service.turnRight).toHaveBeenCalled()
  })

  test('REPORT COMMAND' , () => {
    let result = handleCommand('REPORT', service)
    expect(result).toEqual(true)
    expect(service.report).toHaveBeenCalled()
  })
})