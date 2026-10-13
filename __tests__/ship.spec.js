import Ship from '../src/ship.js'

test('Ship of length 3 sinks after 3 hits', () => {
  const threeTileShip = new Ship(3)

  threeTileShip.hit()
  threeTileShip.hit()
  threeTileShip.hit()

  expect(threeTileShip.isSunk()).toBe(true)
})

test('Ship gets the right coordinates', () => {
  const ship = new Ship(3, 5, 8)

  expect(ship.start).toBe(5)
  expect(ship.end).toBe(8)
})
