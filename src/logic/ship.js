class Ship {
  constructor(length, type,  x, y) {
    this.length = length
    this.type = type
    this.x = x
    this.y = y
  }

  #hits = 0

  #sunk = false

  hit() {
    this.#hits++
  }

  isSunk() {
    if (this.#hits >= this.length) {
      return true
    }

    return false
  }
}

export default Ship
