const getGameboard = (() => {
  const currentBoard = []
  return currentBoard
})();

const createGameboard = (() => {
  const newBoard = []
  for (i = 0; i<9; i++) {newBoard.push(null)}
  return newBoard
})();

const winConditions = (() => {
  const combinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
  ]
  return combinations
})();

const getPlayerOne = (() => {
  const currentPicks = []
  return currentPicks
})();

const getPlayerTwo = (() => {
  const currentPicks = []
  return currentPicks
})();
