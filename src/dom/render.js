import elements from './elements.js'

class Render {
  #container

  constructor(player) {
    this.player = player
    this.#container = document.body.querySelector(`.player${this.player.number}-display`)
  }

  renderName() {
    const nameDisplay = document.createElement('p')
    nameDisplay.textContent = `Player ${this.player.number}: ` +  this.player.name
    nameDisplay.classList.add(`player${this.player.number}-name`)

    this.#container.append(nameDisplay)
  }

  renderBoard() {
    const board = document.createElement('div')
    board.classList.add(`player${this.player.number}-board`, 'board')

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const tile = document.createElement('div')
        tile.classList.add('tile', `${i}`, `${j}`)

        if (this.player.number === 1) {
          switch (this.player.board.getTile(i, j)) {

            case 'X':
              tile.textContent = 'X'
              break

            case '|':
              tile.textContent = '|'
          }
        }

        if (this.player.number === 2) {
          switch (this.player.board.getTile(i, j)) {
            case 'X':
              tile.textContent = 'X'
              tile.classList.add('checked')
              break

            case '|':
              tile.textContent = '|'
              tile.classList.add('checked')
          }
        }

        board.append(tile)
        console.log(this.player.name)
      }
    }

    if (this.#container.querySelector('.board')) {
      this.#container.querySelector('.board').remove()
    }

    this.#container.append(board)
  }

  renderWin() {
    elements.winScreen.textContent = `${this.player.name} won`
    elements.winScreen.classList = `win-screen, ${this.player.name}-win`
  }
}

export default Render
