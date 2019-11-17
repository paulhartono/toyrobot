import { handleCommand } from './index';
import RobotService, { Robot } from '../robot';
import Table from '../table';
import Rules, { Direction } from '../rules';

const table: Table = {
  sizeX: 5,
  sizeY: 5
}
let rules: Rules
let robot: Robot 
let service: RobotService

describe('Handle Command Input', () => {
  beforeAll (() => {
    rules = new Rules(table)
    robot = { name: 'ROBOT-X' } as Robot
    service = new RobotService(rules, robot)
    service.place({x:1,y:1}, Direction.NORTH)
  })

  test('Invalid command' , () => {
    let result = handleCommand('any invalid command here', service)
    expect(result).toEqual(false)
  })

  test('PLACE COMMAND' , () => {
    let result = handleCommand('PLACE 1,2,NORTH', service)
    expect(result).toEqual(true)
  })

  test('MOVE COMMAND' , () => {
    let result = handleCommand('MOVE', service)
    expect(result).toEqual(true)
  })

  test('LEFT COMMAND' , () => {
    let result = handleCommand('LEFT', service)
    expect(result).toEqual(true)
  })

  test('RIGHT COMMAND' , () => {
    let result = handleCommand('RIGHT', service)
    expect(result).toEqual(true)
  })

  test('REPORT COMMAND' , () => {
    let result = handleCommand('REPORT', service)
    expect(result).toEqual(true)
  })
})