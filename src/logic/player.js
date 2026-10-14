import Gameboard from './gameboard.js'

class Player {
  constructor(name, type) {
    this.name = name
    this.type = type
  }

  board = new Gameboard()

  checkLose() {
    return this.board.getReport()
  }
}

export default Player
