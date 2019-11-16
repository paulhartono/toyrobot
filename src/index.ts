import 'dotenv/config';
import RobotService, { Robot } from './robot';
import Table from './table';
import Rules, { Direction } from './rules';
import Coordinate from './coordinate';
// import * as readline from 'readline'

// const i = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// })
// i.question(`What's your name?`, (name) => {
//   console.log(`Hi ${name}!`)
//   readline.close()
// })

console.info('----------------------------------------------------------------')
console.info('--                       toyrobot                             --')
console.info('----------------------------------------------------------------')
console.info('author: Paul Hartono')
console.info('email: paul.hartono@gmail.com')
console.info('')

if (!process.env.TABLE_SIZE_X || !process.env.TABLE_SIZE_Y) throw 'Missing Table sizes! Aborting...'

console.log('Setting up Table...')
const table: Table = {
  sizeX: Number(process.env.TABLE_SIZE_X),
  sizeY: Number(process.env.TABLE_SIZE_Y)
}
console.info(`TABLE_SIZE_X: ${process.env.TABLE_SIZE_X}`)
console.info(`TABLE_SIZE_Y: ${process.env.TABLE_SIZE_Y}`)
console.log('  - DONE')
console.info('')


try {
  
  console.log('Setting up Rules...')
  const rules: Rules = new Rules(table)
  console.log('  - DONE')

 
  
  var robot: Robot = { name: 'ROBOT-X' } as Robot

  let service: RobotService = new RobotService(rules, robot)
  service.place({x: 1, y:1} as Coordinate, Direction.NORTH)
  service.move()
  service.left()
  service.move()
  console.log(service.report())
} catch (e) {
  console.error(e)
}
