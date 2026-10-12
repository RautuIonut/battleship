class Ship {
  constructor(length) {
    this.length = length
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
