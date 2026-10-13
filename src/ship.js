class Ship {
  constructor(length, start, end) {
    this.length = length
    this.start = start
    this.end = end
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
