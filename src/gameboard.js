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

  getShip(x, y) {
    for (let ship of this.#ships) {
      if (
        ship.x === x &&
        y > ship.y - ship.length &&
        y <= ship.y
      ) return this.#ships.indexOf(ship)
    }
  }

  getTile(x, y) {
    return this.#tiles[x][y]
  }
}

export default Gameboard
