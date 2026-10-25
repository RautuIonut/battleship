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

  lost

  #removeShip(x, y) {
    if (this.getShip(x, y).isSunk()) {
      this.#ships.splice(this.getShipId(x, y), 1)
    }
  }

  getTile(x, y) {
    return this.#tiles[x][y]
  }

  placeShip(x, y, type, length) {
    if (this.#ships.length >= 5) {
      return 'You can\'t place more ships.'
    }

    const ship = new Ship(
      length,
      type,
      x,
      y
    )

    if (type === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        const currentY = y - i

        if (
          this.#tiles[x][currentY] !== 0 ||
          (currentY > 0 && this.#tiles[x][currentY - 1] !== 0) ||
          (currentY < 9 && this.#tiles[x][currentY + 1] !== 0)
        ) {
          return 'You can\'t place a ship there.'
        }

        if (
          x > 0 && this.#tiles[x - 1][currentY] !== 0 ||
          x < 9 && this.#tiles[x + 1][currentY] !== 0
        ) {
          return 'You can\'t place a ship there.'
        }
      }

      for (let i = 0; i < ship.length; i++) {
        this.#tiles[x][y - i] = 1
      }

    } else if (type === 'vertical') {
        for (let i = 0; i < ship.length; i++) {
          const currentX = x + i

          if (currentX > 9) {
            return 'You can\'t place a ship there.'
          }

          if (
            this.#tiles[currentX][y] !== 0 ||
            (currentX < 9 && this.#tiles[currentX + 1][y] !== 0)
          ) {
            return 'You can\'t place a ship there.'
          }

          if (
            y > 0 && this.#tiles[currentX][y - 1] !== 0 ||
            y < 9 && this.#tiles[currentX][y + 1] !== 0
          ) {
            return 'You can\'t place a ship there.'
          }
        }

        for (let i = 0; i < ship.length; i++) {
          this.#tiles[x + i][y] = 1
        }
    }

    this.#ships.push(ship)
  }

  getShips() {
    return this.#ships.length
  }

  getShipId(x, y) {
    for (let ship of this.#ships) {
      switch (ship.type) {
        case 'horizontal':
          if (
            ship.x === x &&
            y > ship.y - ship.length &&
            y <= ship.y
          ) return this.#ships.indexOf(ship)
          break

        case 'vertical':
          if (
            ship.y === y &&
            x < ship.x + ship.length &&
            x >= ship.x
          ) return this.#ships.indexOf(ship)
      }
    }
  }

  getShip(x, y) {
    return this.#ships[this.getShipId(x, y)]
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

    return 'wrong'
  }

  getReport() {
    if (this.#ships.length === 0) {
      this.lost = true
      return true
    }

    return false
  }

  placeRandomShips() {
    const types = ['horizontal', 'vertical']

    while (this.#ships.length < 5) {
      this.placeShip(
        Math.floor((Math.random() * 4) + 2),
        Math.floor(Math.random() * 9 + 1),
        Math.floor(Math.random() * 9 + 1),
        types[Math.floor(Math.random() * (1 - 0 + 1)) + 0]
      )
    }
  }
}

export default Gameboard
