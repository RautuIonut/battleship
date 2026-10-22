import Player from '../logic/player.js'
import elements from './elements.js'
import Render from './render.js'

let player1
let player2
let player1Render
let player2Render

document.body.addEventListener('click', (e) => {

  if (e.target.classList.contains('start-btn')) {
    if (elements.playerInput.value === '') return

    player1 = new Player(elements.playerInput.value, 'real', 1)
    player2 = new Player('computer', 'computer', 2)
    player1.board.placeRandomShips()
    player2.board.placeRandomShips()

    player1Render = new Render(player1)
    player2Render = new Render(player2)

    elements.startScreen.classList.toggle('hidden')

    player1Render.renderName()
    player2Render.renderName()
    player1Render.renderBoard()
    player2Render.renderBoard()
  }

  if (e.target.classList.contains('tile')) {
    if (e.target.classList.contains('checked')) return
    if (e.target.closest('.player1-board')) return
    if (player1.board.lost || player2.board.lost) return

    player2.board.recieveAttack(
      Number(e.target.classList[1]),
      e.target.classList[2] ? Number(e.target.classList[2]) : Number(e.target.classList[1])
    )

    player2Render.renderBoard()

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

    if (player1.board.getReport()) {
      player2Render.renderWin()
      return
    }
  }
})
