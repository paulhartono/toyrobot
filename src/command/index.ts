import { Command } from "./command";
import Coordinate from "../coordinate";
import { Direction } from "../rules";
import RobotService from "../robot";

let regex: RegExp = /^(PLACE|MOVE|LEFT|RIGHT|REPORT)(.*)$/;

export const handleCommand = (input: string, service: RobotService): boolean => {
  let result = true

  try {
    let found = input.match(regex)
    let cmd: string = ''

    if (found && found[1]) {
      cmd = found[1].toUpperCase()

      switch (cmd) {
        case Command.PLACE:
          let args = found[2]
          if (args) {
            let argsArray = args.split(',')
            let c: Coordinate = {x: Number(argsArray[0]), y: Number(argsArray[1])}

            if (argsArray[2]) {
              if (argsArray[2] === Direction.NORTH) service.place(c, Direction.NORTH)
              else if (argsArray[2] === Direction.EAST) service.place(c, Direction.EAST)
              else if (argsArray[2] === Direction.SOUTH) service.place(c, Direction.SOUTH)
              else if (argsArray[2] === Direction.WEST) service.place(c, Direction.WEST)
              else console.error('Unrecognise Direction')
            }

          }
          else {
            console.error('PLACE command require arguments in the form of [x],[y],[direction]')
          } 
          break;
        case Command.MOVE:
          service.move()
          break;
        case Command.LEFT:
          service.turnLeft()
          break;
        case Command.RIGHT:
          service.turnRight()
          break;
        case Command.REPORT:
          console.log(service.report())
          break;
        default:
          break;
      }
    }
    else {
      console.log('Invalid Command')
      result = false
    }
  } catch (e) {
    result = false
    console.error(e)
  }
  return result
}