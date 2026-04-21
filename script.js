const Gameboard =  (() => {
  const currentBoard = (() => {
    const newBoard = []
    for (let i = 0; i < 9; i++) {newBoard.push(null)}
    return newBoard
  })();
  function getBoard() {return currentBoard}
  function addMove(spot, player) {
    currentBoard[spot] = player.index;
  }
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
  let legalMove = 0;
  function makeMove(spot, player){
    if (player.index !== legalMove) {console.log("Illegal move: Not your turn"); return}
    if (Gameboard.getBoard()[spot]!== null) {console.log("Illegal move: Space occupied"); return}
    Gameboard.addMove(spot,player)
    player.addPick(spot)
    GameDirector.checkWin(player)
    legalMove = 1 - legalMove;
    return Gameboard.getBoard()
  };
  function checkWin(player){
    const isSubset = (array1, array2) => {
      return array2.every((element) => array1.includes(element));
    };
    const sortedPlayer = player.getPicks().toSorted();
    for (let x of winConditions) {
      if (isSubset(sortedPlayer, x)){
        return console.log("Game ended")
      }
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