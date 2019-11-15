import Coordinate from "../coordinate";
import { Direction } from "../rules";


export type Robot = {
  name: string,
  coordinate?: Coordinate,
  direction?: Direction
}