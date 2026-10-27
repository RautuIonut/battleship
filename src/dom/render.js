import elements from './elements.js'

class Render {
  #container

  constructor(player) {
    this.player = player
    this.#container = document.body.querySelector(`.player${this.player.number}-display`)
  }

  renderName() {
    this.#container.querySelector('.player-name').textContent = this.player.name
  }

  renderShipNumber() {
    this.#container.querySelector('.fleet-info > span').textContent = this.player.board.getShips()
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
            case 1:
              tile.innerHTML = '<p>o</p>'
              tile.classList.add('ship')
              break

            case 'X':
              tile.innerHTML = '<p>x</p>'
              tile.classList.add('hit')
              break

            case '|':
              tile.innerHTML = '<p>.</p>'
              tile.classList.add('miss')
          }
        }

        if (this.player.number === 2) {
          switch (this.player.board.getTile(i, j)) {
            case 'X':
              tile.innerHTML = '<p>x</p>'
              tile.classList.add('hit')
              tile.classList.add('checked')
              break

            case '|':
              tile.innerHTML = '<p>.</p>'
              tile.classList.add('miss')
              tile.classList.add('checked')
          }
        }

        board.append(tile)
      }
    }

    if (this.#container.querySelector('.board')) {
      this.#container.querySelector('.board').remove()
    }

    this.#container.append(board)
  }

  renderPrepare() {
    const container = elements.prepareScreen.querySelector('.player-prepare-display')
    const board = document.createElement('div')
    board.classList.add('player-prepare', 'board')

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const tile = document.createElement('div')
        tile.classList.add('tile', `${i}`, `${j}`)

        if (this.player.board.getTile(i, j) === 1) {
          tile.innerHTML = '<p>o</p>'
          tile.classList.add('checked')
          tile.classList.add('ship')
        }

        board.append(tile)
      }
    }

    if (container.querySelector('.player-prepare')) {
      container.querySelector('.board').remove()
    }

    container.append(board)
  }

  renderWin() {
    elements.winScreen.textContent = `${this.player.name} won`
    elements.winScreen.classList.add(`player${this.player.number}-win`)
  }
}

export default Render
