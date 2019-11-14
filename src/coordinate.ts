class Coordinate {

  x: number
  y: number

  constructor(x: number, y:number) {
    this.x = x
    this.y = y
  }

  get() {
    return {
      x: this.x,
      y: this.y
    }
  }

}

export default Coordinate
