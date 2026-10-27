import Gameboard from '../src/logic/gameboard.js'

test('placeShip adds ships to the #ships array', () => {
  const board = new Gameboard()

  board.placeShip(8, 8, 'horizontal', 3)
  board.placeShip(1, 6, 'horizontal', 2)
  board.placeShip(1, 8, 'vertical', 5)
  expect(board.getShips()).toBe(3)
})

test('Cant add more then 5 ships', () => {
  const board = new Gameboard()

  board.placeShip(5, 8, 'horizontal', 2)
  board.placeShip(8, 4, 'horizontal', 3)
  board.placeShip(1, 6, 'horizontal', 3)
  board.placeShip(2, 0, 'vertical', 4)
  board.placeShip(0, 9, 'vertical', 5)

  expect(board.placeShip(3, 7, 'horizontal')).toBe(
    "You can't place more ships."
  )
})

test('Cant place ships if there is no empty space', () => {
  const board = new Gameboard()

  board.placeShip(8, 4, 'horizontal', 2)
  board.placeShip(1, 6, 'horizontal', 3)
  board.placeShip(5, 9, 'vertical', 4)

  expect(board.placeShip(0, 0, 'horizontal', 3)).toBe(
    "You can't place a ship there."
  )
  expect(board.placeShip(9, 7, 'vertical', 5)).toBe(
    "You can't place a ship there."
  )
  expect(board.getShips()).toBe(3)
})

test('getShipId gets the right ship', () => {
  const board = new Gameboard()

  board.placeShip(8, 4, 'horizontal', 2)
  board.placeShip(1, 6, 'horizontal', 3)
  board.placeShip(3, 7, 'vertical', 3)

  expect(board.getShipId(8, 3)).toBe(0)
  expect(board.getShipId(1, 5)).toBe(1)
  expect(board.getShipId(4, 7)).toBe(2)
  expect(board.getShipId(2, 7)).toBeUndefined()
})

test('recieveAttack works', () => {
  const board = new Gameboard()

  board.placeShip(8, 4, 'horizontal', 3)
  board.placeShip(1, 6, 'horizontal', 4)
  board.placeShip(3, 8, 'vertical', 2)

  board.recieveAttack(1, 6)
  board.recieveAttack(1, 5)
  board.recieveAttack(1, 4)
  board.recieveAttack(1, 3)

  expect(board.recieveAttack(5, 6)).toBe('miss')
  expect(board.recieveAttack(8, 3)).toBe('hit')
  expect(board.recieveAttack(8, 3)).toBe('wrong')
  expect(board.recieveAttack(4, 8)).toBe('hit')
  expect(board.getShip(8, 4).isSunk()).toBe(false)
})

test('Records missed shots properly', () => {
  const board = new Gameboard()

  board.recieveAttack(8, 4)
  board.recieveAttack(1, 5)
  board.recieveAttack(1, 2)

  expect(board.getMissed()).toBe(3)
})

test('Sunken ships get romoved', () => {
  const board = new Gameboard()

  board.placeShip(1, 6, 'horizontal', 2)
  board.placeShip(3, 7, 'vertical', 3)
  board.placeShip(8, 4, 'horizontal', 5)

  board.recieveAttack(1, 6)
  board.recieveAttack(1, 5)

  board.recieveAttack(3, 7)
  board.recieveAttack(4, 7)
  board.recieveAttack(5, 7)

  expect(board.getShips()).toBe(1)
})

test('Report on wether all ships have been sunk', () => {
  const board = new Gameboard()

  board.placeShip(1, 6, 'horizontal', 3)
  board.placeShip(8, 4, 'horizontal', 2)

  expect(board.getReport()).toBe(false)

  board.recieveAttack(1, 6)
  board.recieveAttack(1, 5)
  board.recieveAttack(1, 4)
  board.recieveAttack(8, 4)
  board.recieveAttack(8, 3)

  expect(board.getReport()).toBe(true)
})

test('Can place random ships', () => {
  const board = new Gameboard()

  board.placeRandomShips()

  expect(board.getShips()).toBe(5)
})
