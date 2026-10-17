import Player from '../logic/player.js'
import elements from './elements.js'
import Render from './render.js'

document.body.addEventListener('click', (e) => {
  let player1
  let player2
  let player1Render
  let player2Render

  if (e.target.classList.contains('start-btn')) {
    if (elements.playerInput.value === '') return

    player1 = new Player(elements.playerInput.value, 'real', 1)
    player2 = new Player('computer', 'computer', 2)

    player1Render = new Render(player1)
    player2Render = new Render(player2)

    elements.startScreen.classList.toggle('hidden')

    player1Render.renderName()
    player2Render.renderName()
  }
})
