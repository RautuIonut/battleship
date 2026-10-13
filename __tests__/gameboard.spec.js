import Gameboard from '../src/gameboard.js'

test('placeShip adds ships to the #ships array', () => {
  const board = new Gameboard()

  board.placeShip(8, 8)
  board.placeShip(1, 6)
  board.placeShip(3, 9)

  expect(board.getShips()).toBe(3)
})

test('Cant add more then 5 ships', () => {
  const board = new Gameboard()

  board.placeShip(5, 8)
  board.placeShip(8, 4)
  board.placeShip(1, 6)
  board.placeShip(3, 9)
  board.placeShip(0, 6)

  expect(board.placeShip(7, 9)).toBe('You can\'t place more ships.')
})

test('Placed ships render correctly in the tiles', () => {
  const board = new Gameboard()

  board.placeShip(0, 6)
  board.placeShip(5, 8)

  expect(board.getTile(0, 6)).toBe(1)
  expect(board.getTile(0, 5)).toBe(1)
  expect(board.getTile(5, 8)).toBe(1)
  expect(board.getTile(5, 7)).toBe(1)
})

test('Cant place ships if there is no empty space', () => {
  const board = new Gameboard()

  board.placeShip(8, 4)
  board.placeShip(1, 6)
  board.placeShip(3, 9)

  expect(board.placeShip(0, 0)).toBe('You can\'t place a ship there')
  expect(board.placeShip(8, 5)).toBe('You can\'t place a ship there')
  expect(board.getShips()).toBe(3)
})
