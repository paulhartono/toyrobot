import 'dotenv/config';
import RobotService, { Robot } from './robot';
import Table from './table';
import Rules from './rules';
// import readline from 'readline-sync'
import { handleCommand } from './command';
import * as readline from 'readline'

console.info('----------------------------------------------------------------')
console.info('--                       toyrobot                             --')
console.info('----------------------------------------------------------------')
console.info('author: Paul Hartono')
console.info('email: paul.hartono@gmail.com')
console.info('')

if (!process.env.TABLE_SIZE_X || !process.env.TABLE_SIZE_Y) throw 'Missing Table sizes! Aborting...'

console.debug('Setting up Table...')
const table: Table = {
  sizeX: Number(process.env.TABLE_SIZE_X),
  sizeY: Number(process.env.TABLE_SIZE_Y)
}
console.info(`TABLE_SIZE_X: ${process.env.TABLE_SIZE_X}`)
console.info(`TABLE_SIZE_Y: ${process.env.TABLE_SIZE_Y}`)
console.debug('  - DONE')
console.info('')


try {
  
  console.debug('Setting up Rules...')
  const rules: Rules = new Rules(table)
  console.debug('  - DONE')

  console.debug('Creating Robot instance...')
  let robot: Robot = { name: 'ROBOT-X' } as Robot
  let service: RobotService = new RobotService(rules, robot)
  console.debug('  - DONE')

  // service.place({x: 1, y:1} as Coordinate, Direction.NORTH)
  // service.move()
  // service.move()
  // console.log(service.report())

  console.info('Please insert command below [PLACE, MOVE, LEFT, RIGHT, REPORT, or quit].')

  var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  var recursiveAsyncReadLine = function () {
    
    rl.question('Command: ', function (input) {
      if (input.toLowerCase() === 'quit' || input.toLowerCase() === 'q')  //we need some base case, for recursion
        return rl.close(); //closing RL and returning from function.
      
      try {
        handleCommand(input.toUpperCase(), service)
      }
      catch (e) {
        console.error(e)
      }

      recursiveAsyncReadLine(); //Calling this function again to ask new question
    });
  };
  
  recursiveAsyncReadLine(); //we have to actually start our recursion somehow

} catch (e) {
  console.error(e)
}