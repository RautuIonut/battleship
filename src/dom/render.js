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
}

export default Render
