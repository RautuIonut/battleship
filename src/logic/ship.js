class Ship {
  constructor(length, x, y) {
    this.length = length
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
