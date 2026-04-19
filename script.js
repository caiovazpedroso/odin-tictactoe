const Gameboard = {
  currentBoard: (() => {
    const newBoard = []
    for (let i = 0; i < 9; i++) {newBoard.push(null)}
    return newBoard
  })(),
  getBoard: () => Gameboard.currentBoard
}

const winConditions = (() => {
  const combinations = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ]
  return combinations
});

const PlayerOne = (() => {
  const currentPicks = []
  return currentPicks
});

const PlayerTwo = (() => {
  const currentPicks = []
  return currentPicks
});

const makeMove = ((spot, player) => {
  let newSpot = spot
  return player
});

const gameDirector = (() => {
  return null
});