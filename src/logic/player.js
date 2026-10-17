import Gameboard from './gameboard.js'

class Player {
  constructor(name, type, number) {
    this.name = name
    this.type = type
    this.number = number
  }

  board = new Gameboard()

  checkLose() {
    return this.board.getReport()
  }
}

export default Player
