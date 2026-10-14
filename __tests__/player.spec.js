import Player from '../src/player.js'

test('Player gets name', () => {
  const player1 = new Player('John', 'real')

  expect(player1.name).toBe('John')
})

test('Player gets type', () => {
  const player1 = new Player('John', 'real')
  const player2 = new Player('Bot', 'computer')

  expect(player1.type).toBe('real')
  expect(player2.type).toBe('computer')
})

test('Player can place ships', () => {
  const player1 = new Player('John', 'real')

  player1.board.placeShip(8, 4)
  player1.board.placeShip(1, 6)

  expect(player1.board.getShips()).toBe(2)
})

test('Player cant place ships out of bound', () => {
  const player1 = new Player('John', 'real')

  player1.board.placeShip(8, 4)

  expect(player1.board.placeShip(4, 0)).toBe('You can\'t place a ship there.')
  expect(player1.board.placeShip(8, 5)).toBe('You can\'t place a ship there.')
})

test('Pleyer cant place more then 5 ships', () => {
  const player1 = new Player('John', 'real')

  player1.board.placeShip(5, 8)
  player1.board.placeShip(8, 4)
  player1.board.placeShip(1, 6)
  player1.board.placeShip(3, 9)
  player1.board.placeShip(0, 6)

  expect(player1.board.placeShip(7, 7)).toBe('You can\'t place more ships.')
})

test('Player stores ships', () => {
  const player1 = new Player('John', 'real')

  player1.board.placeShip(1, 6)
  player1.board.placeShip(3, 9)
  player1.board.placeShip(0, 6)

  expect(player1.board.getShips()).toBe(3)
})

test('Player can recieve an attack', () => {
  const player1 = new Player('John', 'real')

  player1.board.placeShip(3, 9)
  player1.board.placeShip(0, 6)
  player1.board.placeShip(1, 6)

  expect(player1.board.recieveAttack(3, 8)).toBe('hit')
  expect(player1.board.recieveAttack(3, 8)).toBeUndefined()
  expect(player1.board.recieveAttack(7, 5)).toBe('miss')
})

test('Player loses when all ships are destoried', () => {
  const player1 = new Player('John', 'real')

  player1.board.placeShip(3, 9)

  expect(player1.checkLose()).toBe(false)

  player1.board.recieveAttack(3, 9)
  player1.board.recieveAttack(3, 8)
  player1.board.recieveAttack(3, 7)
  player1.board.recieveAttack(3, 6)
  player1.board.recieveAttack(3, 5)

  expect(player1.checkLose()).toBe(true)
})
