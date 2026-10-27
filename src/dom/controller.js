import Player from '../logic/player.js'
import elements from './elements.js'
import Render from './render.js'

let player1
let player2
let player1Render
let player2Render

document.body.addEventListener('click', (e) => {

  if (e.target.classList.contains('play-button')) {
    if (elements.playerInput.value === '') {
      elements.startScreenError.textContent = 'You need to choose a name!'
      return
    }

    player1 = new Player(elements.playerInput.value, 'real', 1)
    player1Render = new Render(player1)

    elements.startScreen.classList.toggle('hidden')
    elements.prepareScreen.classList.toggle('hidden')

    player1Render.renderPrepare()
  }

  if (e.target.classList.contains('tile') && !e.target.closest('.player-prepare')) {
    if (e.target.classList.contains('checked')) return
    if (e.target.closest('.player1-board')) return
    if (player1.board.lost || player2.board.lost) return

    player2.board.recieveAttack(
      Number(e.target.classList[1]),
      e.target.classList[2] ? Number(e.target.classList[2]) : Number(e.target.classList[1])
    )

    player2Render.renderBoard()
    player2Render.renderShipNumber()

    if (player2.board.getReport()) {
      player1Render.renderWin()
      return
    }

    let result
    do {
      result = player1.board.recieveAttack(
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      )
    } while (result === 'wrong')

    player1Render.renderBoard()
    player1Render.renderShipNumber()

    if (player1.board.getReport()) {
      player2Render.renderWin()
      return
    }
  }

  if (e.target.classList.contains('tile')) {
    if (!e.target.closest('.player-prepare')) return
    if (e.target.classList.contains('checked')) return

    const x = Number(e.target.classList[1])
    const y = e.target.classList[2] ? Number(e.target.classList[2]) : Number(e.target.classList[1])
    const type = elements.typeSelect.textContent === 'Horizontal' ? 'horizontal' : 'vertical'
    const length = Number(document.querySelector('.selected-length').classList[0])

    if (player1.board.placeShip(x, y, type, length) === undefined) {
      document.querySelector('.selected-length').classList.add('used-length')
    }

    player1Render.renderPrepare()

    elements.prepareScreenError.textContent = ''
  }

  if (e.target.classList.contains('start-btn')) {
    if (player1.board.getShips() < 5) {
      elements.prepareScreenError.textContent = 'You have to place all your ships!'
      return
    }

    elements.prepareScreen.classList.toggle('hidden')
    elements.gameScreen.classList.toggle('hidden')

    player2 = new Player('computer', 'computer', 2)
    player2.board.placeRandomShips()

    player2Render = new Render(player2)

    player1Render.renderName()
    player2Render.renderName()
    player1Render.renderShipNumber()
    player2Render.renderShipNumber()
    player1Render.renderBoard()
    player2Render.renderBoard()
  }

  if (e.target.classList.contains('type-select')) {
    if (e.target.textContent === 'Horizontal') {
      e.target.textContent = 'Vertical'
    } else {
      e.target.textContent = 'Horizontal'
    }
  }

  if (e.target.classList.contains('ship-length-select')) {
    document.querySelector('.selected-length').classList.remove('selected-length')
    e.target.classList.add('selected-length')
  }
})
