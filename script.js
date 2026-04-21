const Gameboard =  (() => {
  const currentBoard = (() => {
    const newBoard = []
    for (let i = 0; i < 9; i++) {newBoard.push(null)}
    return newBoard
  })();
  function getBoard() {return currentBoard}
  function addMove(spot, player) {currentBoard[spot] = player.index}
  return {
    getBoard,
    addMove
  }
})();

const GameDirector = (() => {
  const winConditions = [ 
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
  ];
  function makeMove(spot, player){
    Gameboard.addMove(spot,player)
    player.addPick(spot)
    return Gameboard.getBoard()
  };
  function checkWin(player){
    if (player.currentPicks === winConditions) {
      return null
    }
  }
  return {
    makeMove,
    checkWin
  }
})();

function playerFactory(index){
  return {
    index: index,
    currentPicks: (() => {
      const newBoard = []
      return newBoard
    })(),
    getPicks() { return this.currentPicks },
    addPick(spot) { this.currentPicks.push(spot) }
  }
}

let PlayerOne = playerFactory(0);
let PlayerTwo = playerFactory(1);