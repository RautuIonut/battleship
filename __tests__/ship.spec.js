import Ship from '../src/ship.js'

test('Ship of length 3 sinks after 3 hits', () => {
  const threeTileShip = new Ship(3)

  threeTileShip.hit()
  threeTileShip.hit()
  threeTileShip.hit()

  expect(threeTileShip.isSunk()).toBe(true)
})
