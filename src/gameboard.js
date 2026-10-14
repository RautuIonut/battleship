import Ship from './ship.js'

class Gameboard {
  #tiles = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ]

  #ships = []

  #missed = 0

  placeShip(x, y) {
    if (this.#ships.length >= 5) {
      return 'You can\'t place more ships.'
    }

    const ship = new Ship(Math.floor((Math.random() * 4) + 2), x, y)

    for (let i = 0; i < ship.length; i++) {
      if (this.#tiles[x][y - i] !== 0) {
        return 'You can\'t place a ship there'
      }
    }

    for (let i = 0; i < ship.length; i++) {
      this.#tiles[x][y - i] = 1
    }

    this.#ships.push(ship)
  }

  getShips() {
    return this.#ships.length
  }

  getShipId(x, y) {
    for (let ship of this.#ships) {
      if (
        ship.x === x &&
        y > ship.y - ship.length &&
        y <= ship.y
      ) return this.#ships.indexOf(ship)
    }
  }

  getShip(x, y) {
    return this.#ships[this.getShipId(x, y)]
  }

  getTile(x, y) {
    return this.#tiles[x][y]
  }

  getMissed() {
    return this.#missed
  }

  recieveAttack(x, y) {
    switch (this.#tiles[x][y]) {
      case 0:
        this.#tiles[x][y] = '|'
        this.#missed++
        return 'miss'

      case 1:
        this.#tiles[x][y] = 'X'
        this.getShip(x, y).hit()
        this.#removeShip(x, y)
        return 'hit'
    }
  }

  #removeShip(x, y) {
    if (this.getShip(x, y).isSunk()) {
      this.#ships.splice(this.getShipId(x, y), 1)
    }
  }

  getReport() {
    return this.#ships.length === 0
  }
}

const board = new Gameboard()
board.placeShip(8, 4)
console.log(board.getShip(8, 4).isSunk())

export default Gameboard
