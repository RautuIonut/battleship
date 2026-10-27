import Ship from '../src/logic/ship.js'

test('Ship of length 3 sinks after 3 hits', () => {
  const threeTileShip = new Ship(3)

  threeTileShip.hit()
  threeTileShip.hit()
  threeTileShip.hit()

  expect(threeTileShip.isSunk()).toBe(true)
})

test('Ship gets the right coordinates', () => {
  const ship = new Ship(3, 'horizontal', 5, 8)

  expect(ship.x).toBe(5)
  expect(ship.y).toBe(8)
})

test('Ships can get vertical placement', () => {
  const ship = new Ship(4, 'vertical', 1, 7)

  expect(ship.type).toBe('vertical')
})
