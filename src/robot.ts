import Coordinate from "./coordinate";
import Direction from "./enums/direction";

class Robot {
  
  name: string
  coordinate: Coordinate | null

  constructor(name: string) {
      this.name = name;
      this.coordinate = null
  }

  greet() {
      console.log (`${this.name} says hello.`);
  }

  place(c: Coordinate, direction: Direction) {
    

  }

  move() {

  }

  rotate() {

  }

  

  report() {

  }

}

export default Robot
